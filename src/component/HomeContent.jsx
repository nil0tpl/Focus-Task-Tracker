import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import { StateContext } from "./context/StateContext";
import { DarkModeContext } from "./context/DarkModeContext";

export default function HomeContent() {
	const { task, totalTimeDate, totalMinutesStore, setTotalMinutesStore } = useContext(TaskContext);
	const { state } = useContext(StateContext);
	const { theme } = useContext(DarkModeContext);
	let completedTask = task.filter((element)=>{ return element.completed === true});

	const intervalRef = useRef(null);
	const [initialTime, setInitialTime] = useState(1500)
	const [timerSeconds, setTimerSeconds] = useState(initialTime);
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	document.title = "Focus Task Tracker - Home";
	
	useEffect(()=>{
		setMinutes(Math.floor(timerSeconds / 60));
		setSeconds(timerSeconds % 60);
	}, [timerSeconds]);

	useEffect(()=>{
		
		
	}, [timerSeconds]);

	const startTimer = () =>{

		if(state === 'No task selected'){
			alert("Please select a task first");
			return;
		}

		if(intervalRef.current) return;

		intervalRef.current = setInterval(()=>{
			setTimerSeconds(prev =>{
				if(prev <= 1){
					clearInterval(intervalRef.current);
					intervalRef.current = null;
					return 0;
				}
				return prev-1;
			});

		}, 1000);
		
		
		setIsRunning(true);
	}

	const pauseTimer = () =>{
		calculateTotalTime();
		clearTimer();
	}

	const resetTimer = () =>{
		setTimerSeconds(initialTime);
		setIsRunning(false);

		calculateTotalTime();
		clearTimer();
	}

	const setTimer = (timeInMinutes) =>{
		let newTime = timeInMinutes * 60;
		setInitialTime(newTime)
		setTimerSeconds(newTime);
		setIsRunning(false);

		clearTimer();
	}

	const clearTimer = () =>{
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}

	const calculateTotalTime = () =>{
		let elapsedTimeInSeconds = initialTime - timerSeconds;
		let elapsedTimeInMinutes = Math.floor(elapsedTimeInSeconds / 60);

		if(elapsedTimeInMinutes > 0){
			const updatedTotal = totalMinutesStore + elapsedTimeInMinutes;

			setTotalMinutesStore(updatedTotal);

			const newTime = {
				date: new Date().toLocaleDateString(),
				totalTime: updatedTotal
			};
			totalTimeDate(newTime);
		}
	}

	return (
		<>
				<div className={`space-y-6 py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
					{/* <!-- Focus Timer --> */}
					<div className="rounded-lg p-6 text-center">
						<h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
							Focus Timer
						</h3>

						{/* <!-- Current Task Display --> */}
						<div className="mb-6">
							<p className={`text-sm mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
								Current Task:
							</p>
							<p
								id="currentTaskName"
								className={`text-lg font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
							>
								{state}
							</p>
						</div>

						{/* <!-- Timer Display --> */}
						<div className="mb-6">
							<div
								className={`text-6xl font-bold mb-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}
								id="timerDisplay"
							>
								{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
							</div>
							<div className="flex justify-center space-x-4">
								<button
									onClick={startTimer}
									id="startBtn"
									className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
								>
									Start
								</button>
								<button
									onClick={pauseTimer}
									id="pauseBtn"
									className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium"
									disabled={!isRunning}
								>
									Pause
								</button>
								<button
									onClick={resetTimer}
									id="resetBtn"
									className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
								>
									Reset
								</button>
							</div>
						</div>

						{/* <!-- Timer Presets --> */}
						<div className="grid grid-cols-3 gap-2 mb-4">
							<button
								onClick={() => setTimer(25)}
								className={`px-3 py-2 rounded text-sm ${theme === 'light' ? 'text-gray-800 bg-gray-300 hover:bg-gray-400' : 'text-gray-300 bg-gray-600 hover:bg-gray-500'}`}
							>
								25 min
							</button>
							<button
								onClick={() => setTimer(45)}
								className={`px-3 py-2 rounded text-sm ${theme === 'light' ? 'text-gray-800 bg-gray-300 hover:bg-gray-400' : 'text-gray-300 bg-gray-600 hover:bg-gray-500'}`}
							>
								45 min
							</button>
							<button
								onClick={() => setTimer(60)}
								className={`px-3 py-2 rounded text-sm ${theme === 'light' ? 'text-gray-800 bg-gray-300 hover:bg-gray-400' : 'text-gray-300 bg-gray-600 hover:bg-gray-500'}`}
							>
								60 min
							</button>
						</div>
					</div>

					{/* <!-- Statistics --> */}
					<div className="rounded-lg p-6">
						<h3 className="text-lg text-center font-semibold text-gray-900 dark:text-white mb-4">
							Today's Progress
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="text-center">
								<div
									className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}
									id="totalTasks"
								>
									{task.length}
								</div>
								<div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
									Total Tasks
								</div>
							</div>
							<div className="text-center">
								<div
									className={`text-2xl font-bold ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}
									id="completedTasks"
								>
									{completedTask.length}
								</div>
								<div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
									Completed
								</div>
							</div>
							<div className="text-center">
								<div
									className={`text-2xl font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}
									id="totalFocusTime"
								>
									{totalMinutesStore >= 60 ? `${Math.floor(totalMinutesStore / 60)}h ${totalMinutesStore % 60}m` : `${totalMinutesStore}m`}
								</div>
								<div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
									Focus Time Today
								</div>
							</div>
							<div className="text-center">
								<div
									className={`text-2xl font-bold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'}`}
									id="averageTime"
								>
									{totalMinutesStore >= 60 ? `${Math.floor(totalMinutesStore / 60)}h ${totalMinutesStore % 60}m` : `${totalMinutesStore}m`}
								</div>
								<div className={`text-sm font-bold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'}`}>
									{totalMinutesStore >= 120 ? '(Good)' : `${totalMinutesStore >= 60 ? '(Moderate)' : '(Poor)'}`}
								</div>
								<div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
									Remarks
								</div>
							</div>
						</div>
					</div>
				</div>
		</>
	);
}