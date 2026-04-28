const mongoose = require("mongoose")
require("dotenv").config()
const Student = require("./models/Student")

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))

const students = [
  { studentId: "23021112", name: "Anishu Raj", course: "B.Tech CSE", mobile: "9876543210", parent: "Raj Kumar", parentMobile: "9876543211", hostel: "Sarojini Hostel", room: "217", password: "anishu123" },
  { studentId: "23022970", name: "Anushree Verma", course: "B.Tech CSE", mobile: "9812345678", parent: "Suresh Verma", parentMobile: "9812345679", hostel: "Sarojini Hostel", room: "204", password: "anushree123" },
  { studentId: "23022103", name: "Vaani Bisht", course: "B.Tech CSE", mobile: "9856781234", parent: "Mohan Bisht", parentMobile: "9856781235", hostel: "Sarojini Hostel", room: "312", password: "vaani123" },
  { studentId: "23022277", name: "Tulsi Dubey", course: "B.Tech CSE", mobile: "9834567890", parent: "Ram Dubey", parentMobile: "9834567891", hostel: "Sarojini Hostel", room: "118", password: "tulsi123" },
  { studentId: "23021005", name: "Priya Sharma", course: "B.Tech ECE", mobile: "9867452301", parent: "Vikram Sharma", parentMobile: "9867452302", hostel: "Sarojini Hostel", room: "225", password: "priya123" },
  { studentId: "23021089", name: "Riya Singh", course: "MCA", mobile: "9845123670", parent: "Ajay Singh", parentMobile: "9845123671", hostel: "Sarojini Hostel", room: "301", password: "riya123" }
]

Student.insertMany(students)
  .then(() => { console.log("✅ All students added!"); process.exit() })
  .catch(err => { console.log("❌ Error:", err.message); process.exit() })