import React, { useContext, useRef } from 'react'
import TaskItem from './TaskItem';
import { TaskContext } from './context/TaskContext';
import { DarkModeContext } from './context/DarkModeContext';

export default function AddContent() {
    const { task, addTask } = useContext(TaskContext);
    const { theme } = useContext(DarkModeContext);
    const addBTNRef = useRef();
    const options = useRef(); 
    document.title = "Focus Task Tracker - Add Task";

    const handleAdd = ()=>{
        if(addBTNRef.current.value.trim() === '')
            alert("Please enter a task name.");

        const newtask = {
                id: Date.now(),
                name: addBTNRef.current.value.trim(),
                priority: options.current.value,
                completed: false,
                createdAt: new Date()
        };

        addTask(newtask);
        addBTNRef.current.value = '';
    }

  return (
    <>
        <div className={`space-y-6 py-6 bg-gray-800 min-h-screen flex flex-col item-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                {/* <!-- Add Task Section --> */}
                <div className="rounded-lg p-6">
                    <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Add New Task</h3>
                    <div className="space-y-4">
                        <input type="text" ref={addBTNRef} placeholder="Enter task name..." className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'text-gray-900 bg-gray-200 border-gray-300' : 'text-white bg-gray-700 border-gray-600'}`} />
                        <div className="flex gap-2">
                            <select ref={options} className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'text-gray-900 bg-white border-gray-300' : 'text-white bg-gray-700 border-gray-600'}`}>
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* <!-- Task List --> */}
                <div className="rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Tasks</h3>
                    </div>
                    
                    <div id="taskList" className="space-y-3">
                        {task.length === 0 && <div className='text-gray-500'>No Task Added</div>}
                        {task.map((element, index) =>{
                            return <TaskItem key={index} index={index} task={element} />
                        })}
                    </div>
                </div>
            </div>
     </>
  )
}