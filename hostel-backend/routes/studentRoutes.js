const express =require("express")
const router = express.Router()
const Student = require("../models/Student")

router.post("/login",async(req,res)=>{
    console.log("BODY",req.body)
    const{ studentId,password }=req.body

    const student = await Student.findOne({ studentId,password})

    if(student){
        res.json({ success: true,student  })
    }else{
        res.status(401).json({ success: false })
    }
})
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id })

    if(!student){
      return res.status(404).json({ message: "Student not found" })
    }

    res.json(student)
  } catch(err){
    res.status(500).json({ message: "Server error" })
  }
})

module.exports=router