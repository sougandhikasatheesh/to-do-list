const task=require("../models/task");
//get tasks
const getTasks=(req,res)=>{
    task.find()
    .then((tasks) => {
        res.status(200).json({
            success:true,
            data:tasks
        });
    })

    .catch((err) => {
        res.status(500).json({
            success:false,
            message:err.message
        });
    });   
};

//creating task

const createTask=(req,res)=>{
    const newTask=new task({
        title:req.body.title,
        completed:req.body.completed
    });
    newTask.save()
    .then((tasks) => {
        res.status(200).json({
            success:true,
            data:tasks
        });
    })

    .catch((err) => {
        res.status(500).json({
            success:false,
            message:err.message
        });
    });    
}

//updating tasks

const updateTask=(req,res)=>{
    task.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
            completed: req.body.completed
    },
{ returnDocument: "after" })
    .then((tasks) => {
        res.status(200).json({
            success:true,
            data:tasks
        });
    })

    .catch((err) => {
        res.status(500).json({
            success:false,
            message:err.message
        });
    });  
}

//deleting tasks

const deleteTask=(req,res)=>{
    task.findByIdAndDelete(req.params.id)
    .then((tasks) => {
        res.status(200).json({
            success:true,
            data:tasks
        });
    })

    .catch((err) => {
        res.status(500).json({
            success:false,
            message:err.message
        });
    });  
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};