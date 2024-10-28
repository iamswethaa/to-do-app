import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleAddTask = () => {
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      setTasks([...tasks, { ...newTask, done: false }]);
      setNewTask({ title: '', description: '' });
    }
  };

  const handleEditTask = (index) => {
    setIsEditing(index);
    setNewTask({ title: tasks[index].title, description: tasks[index].description });
  };

  const handleUpdateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, title: newTask.title, description: newTask.description } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
    setNewTask({ title: '', description: '' });
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white dark:bg-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">To-Do List</h1>
          <button onClick={toggleDarkMode} className="text-gray-500 dark:text-gray-200">
            {darkMode ? '☀️' : '🌙'} 
          </button>
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-4 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggleDone(index)}
              className="mr-4"
            />
            <div className="flex-1">
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="text-black dark:text-white bg-gray-50 dark:bg-gray-600 p-1 mb-1 rounded"
                  />
                  <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="text-black dark:text-white bg-gray-50 dark:bg-gray-600 p-1 rounded"
                  />
                  <button onClick={() => handleUpdateTask(index)} className="text-blue-500 mx-2">Save</button>
                </>
              ) : (
                <>
                  <p className={`font-bold ${task.done ? 'line-through' : ''}`}>{task.title}</p>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${task.done ? 'line-through' : ''}`}>{task.description}</p>
                </>
              )}
            </div>
            <button onClick={() => handleEditTask(index)} className="text-blue-500 mx-2">✏️</button>
            <button onClick={() => handleDeleteTask(index)} className="text-red-500">🗑️</button>
          </div>
        ))}

        <div className="mt-4">
          <input
            type="text"
            placeholder="New Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <input
            type="text"
            placeholder="New Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={handleAddTask}
            className="w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
