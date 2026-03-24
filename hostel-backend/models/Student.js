const mongoose=require("mongoose")

const studentSchema =new mongoose.Schema({
    studentId: String,
    name:String,
    course:String,
    mobile:String,
    parent:String,
    parentMobile:String,
    hostel:String,
    room:String,
    password:String
})
module.exports = mongoose.model("Student",studentSchema)