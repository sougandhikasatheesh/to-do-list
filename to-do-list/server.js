const cors = require("cors");
const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/task", taskRoutes);
app.get("/",(req,res)=>{
    res.send("Server is running");
});
//port
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})

