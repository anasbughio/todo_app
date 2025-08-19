import { useEffect, useState } from "react";
import axios from '../axiosConfig';
import '../CSS/home.css'

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    axios.get('/todos')
      .then((res) => {
        setTodos(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching todos:", err);
        setTodos([]);
      });
  }, []);

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      const res = await axios.post('/todos', { text: task });
      setTodos([res.data, ...todos]);
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // Toggle complete
  const toggleComplete = async (id, currentStatus) => {
    try {
      const res = await axios.put(`/todos/${id}`, { completed: !currentStatus });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Update todo
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`/todos/${id}`, { text: editingText });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  return (
    <div className='body'>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={task}
          placeholder="Enter your task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id}>
              {editingId === todo._id ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(todo._id)}>Update</button>
                  <button onClick={() => {
                    setEditingId(null);
                    setEditingText("");
                  }}>Cancel</button>
                </>
              ) : (
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
                  <button onClick={() => {
                    setEditingId(todo._id);
                    setEditingText(todo.text);
                  }}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </ul>
    </div>
  )
}

export default Home;
