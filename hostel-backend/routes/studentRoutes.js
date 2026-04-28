const express = require("express")
const router = express.Router()
const Student = require("../models/Student")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
  console.log("BODY", req.body)
  const { studentId, password } = req.body

  const student = await Student.findOne({ studentId, password })

  if (student) {
    // JWT token banao
    const token = jwt.sign(
      { studentId: student.studentId, name: student.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    res.json({ success: true, student, token })
  } else {
    res.status(401).json({ success: false })
  }
})
// Yeh route add karo — admin ke liye saare students
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 })
    // password: 0 matlab password field mat bhejo
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id })
    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }
    res.json(student)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router