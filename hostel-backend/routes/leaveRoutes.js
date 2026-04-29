const express = require("express")
const router = express.Router()
const Leave = require("../models/Leave")

router.post("/apply", async (req, res) => {
  try {
    const leave = new Leave(req.body)
    await leave.save()
    res.json({ message: "Leave Applied" })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.get("/all", async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ _id: -1 })
    res.json(leaves)
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})

router.get("/:studentId", async (req, res) => {
  try {
    const leaves = await Leave.find({ studentId: req.params.studentId }).sort({ _id: -1 })
    res.json(leaves)
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    )
    res.json(leave)
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.post("/send-otp/:id", async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    await Leave.findByIdAndUpdate(req.params.id, { parentOtp: otp })
    res.json({ message: "OTP sent", otp: otp })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.post("/verify-otp/:id", async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
    if (!leave) return res.status(404).json({ message: "Not found" })

    if (leave.parentOtp === req.body.otp) {
      await Leave.findByIdAndUpdate(req.params.id, { parentConfirmed: true })
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.put("/exit/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { exitTime: new Date() },
      { new: true }
    )
    res.json({ message: "Exit recorded", leave })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.put("/return/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { returnTime: new Date(), status: "Returned" },
      { new: true }
    )
    res.json({ message: "Return recorded", leave })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})


router.put("/extend-request/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        extendRequested: true,
        extendReason: req.body.reason || "",
        requestedEndDate: req.body.newEndDate || ""
      },
      { new: true }
    )
    res.json({ message: "Extension requested", leave })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})

router.put("/extend-approve/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        endDate: req.body.newEndDate,
        extendRequested: false,
        requestedEndDate: "",
        status: "Approved"
      },
      { new: true }
    )
    res.json({ message: "Extension approved", leave })
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})
router.put("/:id", async (req, res) => {
  try {
    const updateData = { status: req.body.status }
    if (req.body.rejectReason) {
      updateData.rejectReason = req.body.rejectReason
    }
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    res.json(leave)
  } catch (err) {
    res.status(500).json({ message: "Error" })
  }
})

module.exports = router