const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const studentRoutes = require("./routes/studentRoutes")
const leaveRoutes  = require("./routes/leaveRoutes")
const gateRoutes   = require("./routes/gateRoutes")
const adminRoutes  = require("./routes/adminRoutes")

app.use("/api/students", studentRoutes)
app.use("/api/leaves",   leaveRoutes)
app.use("/api/gate",     gateRoutes)
app.use("/api/admin",    adminRoutes)

// Parent confirmation link handler (no login needed)
// e.g. GET /parent/confirm?token=xxx&action=confirm
const Leave = require("./models/Leave")
app.get("/parent/confirm", async (req, res) => {
  const { token, action } = req.query
  if (!token || !["confirm","reject"].includes(action)) {
    return res.send(renderParentPage("Invalid link.", "error"))
  }
  const leave = await Leave.findOne({ parentToken: token })
  if (!leave) return res.send(renderParentPage("Link expired or already used.", "error"))
  if (leave.parentStatus !== "Awaiting") {
    return res.send(renderParentPage(`You already ${leave.parentStatus === "Confirmed" ? "confirmed" : "rejected"} this leave.`, "info"))
  }
  if (action === "confirm") {
    leave.parentStatus = "Confirmed"
    leave.status = "ParentPending" // moves to warden queue
  } else {
    leave.parentStatus = "Rejected"
    leave.status = "Rejected"     // auto-reject
  }
  await leave.save()
  const msg = action === "confirm"
    ? `Leave confirmed! The warden will review it next.`
    : `Leave rejected. The student has been notified.`
  res.send(renderParentPage(msg, action === "confirm" ? "success" : "warn"))
})

function renderParentPage(message, type) {
  const colors = {
    success: { bg: "#dcfce7", border: "#16a34a", text: "#15803d" },
    warn:    { bg: "#fef9c3", border: "#ca8a04", text: "#92400e" },
    error:   { bg: "#fee2e2", border: "#dc2626", text: "#991b1b" },
    info:    { bg: "#e0f2fe", border: "#0284c7", text: "#075985" },
  }
  const c = colors[type] || colors.info
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HostelSure – Parent Confirmation</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;padding:20px}
  .card{background:#1e293b;border-radius:20px;padding:40px 36px;max-width:420px;width:100%;text-align:center;border:1px solid #334155}
  .logo{font-size:28px;font-weight:800;color:#6366f1;letter-spacing:-1px;margin-bottom:8px}
  .logo span{color:#f1f5f9}
  .msg-box{background:${c.bg};border:1px solid ${c.border};border-radius:12px;padding:18px 20px;margin-top:24px}
  .msg-box p{color:${c.text};font-size:15px;font-weight:600}
</style></head><body>
<div class="card">
  <div class="logo">Hostel<span>Sure</span></div>
  <p style="color:#64748b;font-size:13px">Smart Leave Management</p>
  <div class="msg-box"><p>${message}</p></div>
</div></body></html>`
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.listen(5000, () => console.log("Server running on port 5000"))