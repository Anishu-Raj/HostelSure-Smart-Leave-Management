const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const studentRoutes = require("./routes/studentRoutes")
const leaveRoutes = require("./routes/leaveRoutes")

app.use("/api/students", studentRoutes)
app.use("/api/leaves", leaveRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.listen(5000, () => {
  console.log("Server running on port 5000")
})