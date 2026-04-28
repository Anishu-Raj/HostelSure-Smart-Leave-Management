const mongoose = require("mongoose")

const leaveSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  startDate: String,
  endDate: String,
  reason: String,
  status: {
    type: String,
    default: "Pending"
  },
  exitTime: { type: Date, default: null },
  returnTime: { type: Date, default: null },
  parentOtp: { type: String, default: null },
  parentConfirmed: { type: Boolean, default: false },
  extendRequested: { type: Boolean, default: false },
  extendReason: { type: String, default: "" },
  requestedEndDate: { type: String, default: "" },
  rejectReason: { type: String, default: "" }
})

module.exports = mongoose.model("Leave", leaveSchema)