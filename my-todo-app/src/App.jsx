import { useState, useEffect } from 'react';

// 1. Choto Component (Lego Block)
const TodoItem = ({ task, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
    </div>
  );
};

// 2. Main Component
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");

  // Data Load kora
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('my-todos')) || [];
    if(savedTasks.length > 0) setTasks(savedTasks);
  }, []);

  // Data Save kora
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputText.trim() === "") return;
    const newTask = { id: Date.now(), text: inputText };
    setTasks([...tasks, newTask]);
    setInputText(""); 
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>📝  Smart To-Do List</h2>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type New Task..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={addTask} style={{ marginLeft: '10px', padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      <div style={{ textAlign: 'left' }}>
        {/* Array theke data niye loop kore component gulo dekhano */}
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onDelete={deleteTask} />
        ))}
        
        {/* Jodi list faka thake */}
        {tasks.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>Thank you for using this! 🎉</p>}
      </div>
    </div>
  );
};

export default App;