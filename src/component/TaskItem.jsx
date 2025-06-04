import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { StateContext } from "./context/StateContext";
import { DarkModeContext } from "./context/DarkModeContext";
import { TaskContext } from "./context/TaskContext";

export default function TaskItem(props) {
     const { theme } = useContext(DarkModeContext);
     const { handleState } = useContext(StateContext);
     const { removeItem, editComplete } = useContext(TaskContext);
     const [ismodal, setIsmodal] = useState(false);

     const selectTaskForTimer = (name) =>{
          handleState(name);
     }

     const editTask = () => {
		setIsmodal(prev => !prev);
	}

	const closeModal = () => {
		setIsmodal(false);
	}
	
     const deleteTask = () => {
          removeItem(props.index);
     }

	const toggleTaskComplete = () => {
		editComplete(props.index)
	}

	return (
		<>

			<div className={`flex items-center justify-between p-4 rounded-lg ${props.task.completed ? 'opacity-75' : ''} ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
				<div className="flex items-center space-x-3 flex-1">
					<input
						type="checkbox"
						checked={props.task.completed}
						onChange={toggleTaskComplete}
						className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
					/>
					<div className="flex-1 ${currentTaskId === task.id ? 'ring-2 ring-blue-500 rounded px-2 py-1' : ''}">
						<h4 className={`font-medium ${props.task.completed ? 'line-through' : ''} ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
							{props.task.name}
						</h4>
						<p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
							Priority: {props.task.priority}
						</p>
					</div>
					<span className={`px-2 py-1 text-xs font-medium rounded-full 
                                     ${props.task.priority === 'high' ? `${theme === 'light' ? 'bg-red-200 text-red-800' : 'bg-red-900 text-red-200'}` : 
                                       props.task.priority === 'medium' ? `${theme === 'light' ? 'bg-yellow-200 text-yellow-800' : 'bg-yellow-900 text-yellow-200'}` : `${theme === 'light' ? 'bg-green-200 text-green-800' : 'bg-green-900 text-green-200'}`}`}>
                            {props.task.priority}
                        </span>
				</div>
				<div className="flex space-x-2 ml-4">
					{!props.task.completed && <button onClick={()=> selectTaskForTimer(props.task.name)} className={`p-1 ${theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-200'}`}>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>}

					<button onClick={editTask} className={`p-1 ${theme === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-gray-200'}`}>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
					</button>
                         
                         
					<button onClick={deleteTask} className={`p-1 ${theme === 'light' ? 'text-red-600 hover:text-red-800' : 'text-red-400 hover:text-red-200'}`}>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
                    {ismodal && <Modal index={props.index} task={props.task} onclose={closeModal} />}
			</div>
		</>
	);
}
