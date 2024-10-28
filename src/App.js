import React, { useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa6";

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
    <div className={`min-h-screen flex flex-col items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleDarkMode} className="black dark:text-gray-200">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <h1 className="text-3xl font-bold my-6">To-Do App</h1>

      {/* Task List */}
      <div className="w-full max-w-md space-y-4 mb-6">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
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
            <button onClick={() => handleEditTask(index)} className="black"><MdEdit /></button>
            <button onClick={() => handleDeleteTask(index)} className="black"><MdDelete /></button>
          </div>
        ))}
      </div>

      {/* New Task Creation Card */}
      <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
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
  );
}

export default App;
