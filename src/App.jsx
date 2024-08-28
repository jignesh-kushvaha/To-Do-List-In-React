import { useEffect, useState } from "react";
import "./App.css";
import DisplayTasks from "./Component/DisplayTasks";

function App() {
  const [tasks, setTasks] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  function HandleAddTasks() {
    if(!isEdited){
      setAllTasks([...allTasks, tasks]);
      addToLocalStorage([...allTasks, tasks]);
      setTasks("");
    }else{
      setIsEdited(false);
      const prevtask = [...allTasks];
      prevtask[editIndex] = tasks;
      setAllTasks(prevtask);
      addToLocalStorage(prevtask);
      setEditIndex(-1);
    }
  }

  function HandleDeleteTask(index) {
    const newTasks = [...allTasks];
    newTasks.splice(index, 1);
    setAllTasks(newTasks);
    addToLocalStorage(newTasks);
  }

  function HandleEditTask(index) {
    setIsEdited(true);
    setEditIndex(index);
    setTasks(allTasks.at(index));
  }

  function addToLocalStorage(task){
    localStorage.setItem("tasks", JSON.stringify(task));
  }

  function getFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    setAllTasks(data);
  }

  useEffect(() =>{
    getFromLocalStorage();
  },[]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-pink-400 to-blue-500 flex flex-col items-center pt-24">
      <div className="mx-auto text-center border-2 border-black rounded-lg px-7 py-4 bg-white/90">
        <h1 className="mb-3 text-xl font-bold">Add Todo list:</h1>
        <input
          type="text"
          placeholder="Add title"
          onChange={(e) =>
            setTasks(e.target.value)
          }
          value={tasks}
          className="w-full p-2 bg-transparent border border-gray-600 rounded focus:outline-none focus:border-gray-400 focus:bg-transparent"
        />{" "}
        <button onClick={HandleAddTasks} className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg px-4 py-2 mt-4 transform transition-transform duration-200 hover:scale-95 font-semibold focus:border-none">{isEdited ? "Update Task" : "Add New Task"} </button>
      </div>
      <DisplayTasks allTasks={allTasks} HandleDeleteTask={HandleDeleteTask} HandleEditTask={HandleEditTask}/>
    </div>
  );
}

export default App;
