import { useState,useEffect } from "react";
import axios from "axios";
function App(){
  const[task,setTasks]=useState([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(()=>{
    axios.get("https://to-do-list-nle4.onrender.com")
    .then((response)=>{
      setTasks(response.data.data)
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);
//func to add task
  const addTask=()=>{
    axios.post("https://to-do-list-nle4.onrender.com",{
      title:title,
      completed:completed
    })
    .then((response)=>{
      setTasks([...task,response.data.data]);
      setTitle("");
    })
    .catch((error)=>{
      console.log(error)
    });
  };

//func to delete task

const deleteTask=(id)=>{
    axios.delete(`https://to-do-list-nle4.onrender.com/task/${id}`)
    .then(()=>{
      const newTasks=task.filter((task)=>task._id !==id);
      setTasks(newTasks);
    })
    .catch((error)=>{
      console.log(error);
    });
};

//func to update task

const updateTask=()=>{
    axios.put(`https://to-do-list-nle4.onrender.com/task/${editId}`,{
      title:title,
      completed:completed
    })
    .then((response)=>{
      const updatedTasks=task.map((task)=>
      task._id===editId? response.data.data:task);
      setTasks(updatedTasks);
      setTitle("");
      setCompleted(false);
      setEditId(null);
    })
    .catch((error)=>{
      console.log(error)
    });
  };

  //mark as completed 

  const toggleStatus=(currentTask)=>{
    axios.put(`https://to-do-list-nle4.onrender.com/task/${currentTask._id}`,{
      title:currentTask.title,
      completed:!currentTask.completed
    })
    .then((response)=>{
      const updatedTasks=task.map((t)=>
      t._id===currentTask._id? response.data.data:t);
      setTasks(updatedTasks);
    })
    .catch((error)=>{
      console.log(error)
    });
  };

return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl text-center font-bold mb-8">
      To Do List
    </h1>
    <div className="flex gap-3 mb-5">
        <input type="text" placeholder="Enter task" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 flex-1 rounded"/>
        <button onClick={editId? updateTask:addTask} className="bg-blue-500 text-white px-4 rounded"> {editId ?"Update" : "Add"}</button>
    </div>
    <div className="max-w-lg mx-auto bg-white shadow rounded p-5">
        {
          task.map((task)=>(
          <div
            key={task._id}
            className="flex justify-between items-center border-b py-3"
          >
          <div>
            <p>{task.title}</p>
            <p>
              {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
          <div className="flex gap-2">
          <button onClick={() => toggleStatus(task)} className="bg-green-500 text-white px-3 py-1 rounded">{task.completed ? "Pending" : "Complete"}</button>
          <button onClick={()=> deleteTask(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>

          <button onClick={() => {
        setTitle(task.title);
        setCompleted(task.completed);
        setEditId(task._id);
        }} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
          </div>
          </div>
          )
          )
        }
    </div>
  </div>
);
}
export default App;
