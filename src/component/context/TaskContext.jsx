import React, { createContext, useEffect, useState } from 'react'
export const TaskContext = createContext();

export function TaskProvider(props) {
     const [task, setTask] = useState([]);
     const [totalMinutesStore, setTotalMinutesStore] = useState(0);

     useEffect(() => {
          const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
          setTask(storedTasks);
     }, []);

     useEffect(()=>{
          localStorage.setItem('tasks', JSON.stringify(task));
     }, [task]);

     const addTask = (newTask) => {
          setTask([...task, newTask]);
     }

     const removeItem = (i) =>{
          let taskRemove = JSON.parse(localStorage.getItem('tasks'));
          let index = i;

          if(taskRemove && taskRemove.length > index){
               taskRemove.splice(index, 1);
               setTask(taskRemove);
               localStorage.setItem('tasks', JSON.stringify(taskRemove));
          }
     }

     const editItem = (newName, priority, i) =>{
          let taskEdit = JSON.parse(localStorage.getItem('tasks'));
          let index = i;

          for(let i=0;i<taskEdit.length;i++){
               if(i === index){
                    taskEdit[i].name = newName;
                    taskEdit[i].priority = priority;
               }
          }
          setTask(taskEdit);
          localStorage.setItem('tasks', JSON.stringify(taskEdit));
     }

     const totalTimeDate = (newTime) => {
          localStorage.setItem('totalTime', JSON.stringify(newTime));
     }

     useEffect(() => {
          const stored = JSON.parse(localStorage.getItem('totalTime'));
          
          if (stored && stored.date === new Date().toLocaleDateString()) {
               setTotalMinutesStore(stored.totalTime);
          } else if (!stored) {
               const newTime = {
                    date: new Date().toLocaleDateString(),
                    totalTime: 0,
               };
               localStorage.setItem('totalTime', JSON.stringify(newTime));
               setTotalMinutesStore(0);
          } else {
               setTotalMinutesStore(0);
          }
     }, []);
     
     const editComplete = (index) =>{
          let taskEdit = JSON.parse(localStorage.getItem('tasks'));
          for(let i=0;i<taskEdit.length;i++){
               if(i === index){
                    taskEdit[i].completed = !taskEdit[i].completed;
               }
          }
          setTask(taskEdit);
          localStorage.setItem('tasks', JSON.stringify(taskEdit));
     }

  return (
     <TaskContext.Provider value={{task, addTask, removeItem, editItem, totalTimeDate, totalMinutesStore, setTotalMinutesStore, editComplete}}>
          {props.children}
     </TaskContext.Provider>
  )
}