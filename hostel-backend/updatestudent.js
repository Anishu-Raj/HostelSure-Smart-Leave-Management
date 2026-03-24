const mongoose = require("mongoose")
require("dotenv").config()
const Student = require("./models/Student")

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))

Student.findOneAndUpdate(
  { studentId: "23021112" },
  {
    name: "Anishu",
    course: "B.Tech CSE",
    mobile: "9876543210",
    parent: "Raj Kumar",
    parentMobile: "9876543211",
    hostel: "Sarojini Hostel",
    room: "217"
  },
  { new: true }
)
.then(data => {
  console.log("✅ Updated!", data)
  process.exit()
})
.catch(err => {
  console.log("❌ Error", err)
  process.exit()
})