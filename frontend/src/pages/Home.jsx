import { useEffect, useState } from "react";
import axios from '../axiosConfig';
import '../CSS/home.css'


const Home = ()=>{
const [task,setTask] = useState("");
const [todos,setTodos] = useState([]);
const [editingId, setEditingId] = useState(null);
const [editingText, setEditingText] = useState("");



useEffect(()=>{
    axios.get('/todos').then((res)=>{
        setTodos(res.data);
    })
},[]);

const addTodo = async(e)=>{
e.preventDefault();
if(!task.trim()) return;
const res  = await axios.post('/todos',{text:task});
setTodos([res.data,...todos]);
setTask("");
}

const deleteTodo = async(id)=>{
    await axios.delete(`/todos/${id}`);
    setTodos(todos.filter((t)=>t._id !== id));
    

} 
const toggleComplete = async (id, currentStatus) => {
    const res = await axios.put(`/todos/${id}`, { completed: !currentStatus });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };      

const handleUpdate = async(id)=>{
    try {
        const res = await axios.put(`/todos/${id}`,{text:editingText});
        setTodos(todos.map((t)=>(t._id === id ?res.data:t)));
        setEditingId(null);
        setEditingText("");     
    } catch (error) {
        console.error("Error updating todo:", error);       
        
    }
}
    return(

<div className='body'>
<form onSubmit={addTodo} className="todo-form">
<input 
type="text"
value={task}
placeholder="Enter your task"
onChange={(e)=> setTask(e.target.value) }
/>
<button type="submit">Add</button>
</form>


<ul>
    {todos.map((todo)=>(
        
       <li key={todo._id}>
        {editingId === todo._id ?(
            <>
            <input
            value={editingText}
            onChange={(e)=> setEditingText(e.target.value)}
            />
            
            <button onClick={()=> handleUpdate(todo._id)}>Update</button>
            <button onClick={()=> handleUpdate(null)}>Cancel</button>
            </>

  ):(
    <>
  <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => toggleComplete(todo._id, todo.completed)}
        className={todo.completed ? "completed" : ""}
      >
        {todo.text}
      </span>
    <button onClick={()=>{
        setEditingId(todo._id)
        setEditingText(todo.text)
    }}>Edit</button>
    <button onClick={()=> deleteTodo(todo._id)}>Delete</button>

</>

  )}

       </li> 
    ))}
</ul>
</div>


)
}

export default Home;