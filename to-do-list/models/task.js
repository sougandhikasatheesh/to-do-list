const mongoose=require("mongoose");
const task=new mongoose.model("task",{
    title:String,
    completed:Boolean

});
module.exports=task;