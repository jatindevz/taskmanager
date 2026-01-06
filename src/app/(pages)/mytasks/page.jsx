"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";


const MyTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [task, setTask] = useState("");
  const [checkedTasks, setCheckedTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const toggleTaskChecked = (id) => {
    setCheckedTasks(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/task", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setAllTasks(data.data);
      } else {
        console.log("Failed to fetch tasks:", data.error);
        setError("Not Logged In");
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setError("Not Logged In");
    }
    setLoading(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      const data = await res.json();

      if (data.success) {
        setAllTasks(data.data); // update tasks from backend
        setTask("");
      } else {
        console.error("Failed to add task:", data.error);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`/api/task?id=${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAllTasks(data.data);
      } else {
        console.error("Failed to delete task:", data.error);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (error) {
    return (
        <div className="min-h-screen bg-black flex items-center flex-col justify-center">
            <div className="text-red-500 text-xl">Error: {error}</div>
        </div>
    );
}

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 bg-[#0a0a0a] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">
          My To-Do List
        </h2>

        <form className="flex space-x-2 mb-6" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="px-4 py-3 rounded-md bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold hover:from-gray-500 hover:to-gray-700 transition active:scale-95"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : (
          <ul className="space-y-3">
            {allTasks.length === 0 && (
              <li className="text-center text-gray-500">No tasks yet</li>
            )}
            {allTasks.map(({ _id, task }) => (
              <li
                key={_id}
                className="flex justify-between items-center bg-[#1a1a1a] px-4 py-2 rounded-md text-white"
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div
                    onClick={() => toggleTaskChecked(_id)}
                    className={`h-5 w-5 flex items-center justify-center border rounded-full transition 
      ${checkedTasks[_id] ? "bg-purple-600 border-purple-600" : "border-gray-500"}
    `}
                  >
                    {checkedTasks[_id] && <Check className="text-white w-3 h-3" />}
                  </div>

                  <span className={checkedTasks[_id] ? "line-through text-gray-400" : ""}>
                    {task}
                  </span>
                </label>

                <button
                  onClick={() => handleDeleteTask(_id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/profile">
        <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg cursor-pointer active:scale-95">
          Go to Profile
        </button>
      </Link>
    </div>
  );
};

export default MyTask;
