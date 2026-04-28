const express = require("express")
const router  = express.Router()
const Leave   = require("../models/Leave")
const Student = require("../models/Student")

async function sendSMS(to, body) {
  if (!process.env.TWILIO_SID || process.env.TWILIO_SID === "YOUR_SID") {
    console.log(`[Mock SMS to ${to}]: ${body}`)
    return
  }
  const twilio = require("twilio")
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
  await client.messages.create({ from: process.env.TWILIO_FROM, to, body })
}

// POST /api/gate/scan — guard scans QR
// Body: { leaveId, studentId, scanType: "exit" | "entry" }
router.post("/scan", async (req, res) => {
  try {
    const { leaveId, studentId, scanType } = req.body
    if (!["exit", "entry"].includes(scanType)) {
      return res.status(400).json({ valid: false, message: "Invalid scan type" })
    }

    const leave = await Leave.findById(leaveId)
    if (!leave) return res.json({ valid: false, message: "Leave not found" })
    if (leave.studentId !== studentId) return res.json({ valid: false, message: "Student mismatch" })
    if (leave.status !== "Approved") return res.json({ valid: false, message: "Leave not approved" })

    const now = new Date().toISOString()

    if (scanType === "exit") {
      if (leave.exitTime) return res.json({ valid: false, message: "Already scanned for exit" })
      leave.exitTime = now
      await leave.save()

      // Notify parent of exit
      const student = await Student.findOne({ studentId })
      if (student && student.parentMobile) {
        await sendSMS(student.parentMobile,
          `HostelSure: ${student.name} has exited the hostel at ${new Date(now).toLocaleString("en-IN")}. Expected return: ${leave.endDate}.`)
      }
      return res.json({ valid: true, message: `Exit logged at ${new Date(now).toLocaleTimeString("en-IN")}`, leave })
    }

    if (scanType === "entry") {
      if (!leave.exitTime) return res.json({ valid: false, message: "No exit recorded yet" })
      if (leave.returnTime) return res.json({ valid: false, message: "Already scanned for return" })
      leave.returnTime = now
      await leave.save()

      // Check late return
      const endDate = new Date(leave.endDate + "T23:59:00")
      const isLate = new Date(now) > endDate
      const student = await Student.findOne({ studentId })
      if (student && student.parentMobile) {
        const lateMsg = isLate ? " (LATE RETURN)" : ""
        await sendSMS(student.parentMobile,
          `HostelSure: ${student.name} has returned to the hostel at ${new Date(now).toLocaleString("en-IN")}${lateMsg}.`)
      }
      return res.json({
        valid: true,
        isLate,
        message: `Return logged at ${new Date(now).toLocaleTimeString("en-IN")}${isLate ? " — LATE" : ""}`,
        leave
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ valid: false, message: "Server error" })
  }
})

// GET /api/gate/logs — all exits/entries for warden live view
router.get("/logs", async (req, res) => {
  const logs = await Leave.find({ exitTime: { $exists: true } }).sort({ exitTime: -1 }).limit(50)
  res.json(logs)
})

// POST /api/gate/check-late-alerts — cron-style endpoint to send late return alerts
// Call this from a scheduler or manually from warden dashboard
router.post("/check-late-alerts", async (req, res) => {
  try {
    const now = new Date()
    const overdueLeaves = await Leave.find({
      status: "Approved",
      exitTime: { $exists: true },
      returnTime: { $exists: false },
      alertSent: false
    })

    let alertCount = 0
    for (const leave of overdueLeaves) {
      const endDate = new Date(leave.endDate + "T23:59:00")
      if (now > endDate) {
        const student = await Student.findOne({ studentId: leave.studentId })
        if (student && student.parentMobile) {
          await sendSMS(student.parentMobile,
            `HostelSure ALERT: ${student.name} has NOT returned to the hostel. Expected by ${leave.endDate}. Please contact your child immediately.`)
        }
        leave.alertSent = true
        await leave.save()
        alertCount++
      }
    }
    res.json({ alertsSent: alertCount })
  } catch (err) {
    res.status(500).json({ error: "Alert check failed" })
  }
})

module.exports = router