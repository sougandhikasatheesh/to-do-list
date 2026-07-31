const mongoose=require("mongoose");
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>
    {
        console.log("Mongodb conncted");

    })
    .catch((err)=>{
        console.log(err);
    });
}
module.exports=connectDB;