const express = require("express")
const router = express.Router()
const Leave = require("../models/Leave")

router.post("/apply", async (req, res) => {
    const leave = new Leave(req.body)
    await leave.save()
    res.json({ message: "Leave Applied" })
})
router.get("/all", async (req, res) => {
  const leaves = await Leave.find()
  res.json(leaves)
})
router.get("/:studentId", async (req, res) => {
    const leaves = await Leave.find({ studentId: req.params.studentId })
    res.json(leaves)
})

router.put("/:id", async (req, res) => {
    const { status } = req.body

    const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    )

    res.json(leave)
})

module.exports = router