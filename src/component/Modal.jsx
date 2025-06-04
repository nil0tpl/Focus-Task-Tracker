import React, { useContext, useRef } from 'react'
import { DarkModeContext } from './context/DarkModeContext';
import { TaskContext } from "./context/TaskContext";

export default function Modal(props) {
    const { theme } = useContext(DarkModeContext);
    const { editItem } = useContext(TaskContext);
    let inpRef = useRef(null);
    let selectRef = useRef(null);    
    let editRef = useRef(null);
    
     const saveTask = () => {
        if (inpRef.current.value.trim() === '') {
            alert('Task name cannot be empty');
            return;
        }
        let newName = inpRef.current.value;
        editItem(newName, selectRef.current.value, props.index);
        inpRef.current.value = '';
        props.onclose();
        
    }
    const closeEditModal = () =>{
        props.onclose();
    }

  return (
    <div id="editModal" ref={editRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`rounded-lg p-6 w-full max-w-md mx-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Edit Task</h3>
            <div className="space-y-4">
                <input ref={inpRef} type="text" id="editTaskInput" className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  ${theme === 'light' ? 'text-gray-900 bg-gray-100 border-gray-300' : 'text-white bg-gray-700 border-gray-600'}`} />
                <select ref={selectRef} id="editPrioritySelect" className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'text-gray-900 bg-gray-100 border-gray-300' : 'text-white bg-gray-700 border-gray-600'}`}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <div className="flex gap-2">
                    <button onClick={saveTask} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1">Save</button>
                    <button onClick={closeEditModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex-1">Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}
