// src/components/Tasks.jsx
"use client";

import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Tasks({ tasks, setTasks }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');

   
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;
        const newTask = { id: Date.now(), text: newTaskText, completed: false };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
        setIsAdding(false);
    };

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };


    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setOpenMenuId(null); 
    };

    const handleMenuToggle = (taskId) => {
        
        setOpenMenuId(openMenuId === taskId ? null : taskId);
    };

    return (
        <div className="relative z-10 max-w-xl mx-auto w-full mt-8 px-4">
            <div className="flex items-center justify-between border-b-2 border-white/20 pb-2 mb-4">
                <h2 className="text-xl font-bold">Tasks</h2>
                <button className="bg-white/10 p-2 rounded-md hover:bg-white/20"><BsThreeDotsVertical /></button>
            </div>

            <div className="space-y-3 mb-4">
                {tasks.map((task) => (
                    
                    <div key={task.id} className="relative bg-white p-4 rounded-md flex items-center gap-4 text-black shadow">
                        <button onClick={() => handleToggleComplete(task.id)} className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                            {task.completed && '✔'}
                        </button>
                        <p className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</p>

                      
                        <button onClick={() => handleMenuToggle(task.id)} className="text-gray-400 hover:text-black">
                            <BsThreeDotsVertical size={20} />
                        </button>

                        {openMenuId === task.id && (
                            <div className="absolute right-4 top-12 bg-white rounded-md shadow-lg py-1 w-28 z-20">
                                <button
                                    className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    disabled
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="w-full text-left px-3 py-1 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <FiTrash2 size={14} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isAdding && (
                <form onSubmit={handleAddTask} className="bg-white p-4 rounded-md mb-4 shadow">
                    <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="What are you working on?" className="w-full text-black bg-gray-100 p-2 rounded-md outline-none" autoFocus />
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setIsAdding(false)} className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400" disabled={newTaskText.trim() === ''}>Save</button>
                    </div>
                </form>
            )}

            <button onClick={() => setIsAdding(true)} className="w-full flex items-center justify-center gap-2 p-4 bg-black/10 border-2 border-dashed border-white/20 rounded-md hover:bg-black/20" style={{ display: isAdding ? 'none' : 'flex' }}>
                <AiOutlinePlusCircle size={20} />
                Add Task
            </button>
        </div>
    );
}