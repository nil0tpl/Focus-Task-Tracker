import React, { createContext, useState } from 'react'

export const StateContext = createContext();

export function StateContextProvide(props) {

     const [state, setState] = useState('No task selected');

     const handleState = (taskName)=>{
          setState(taskName);
     }
  return (
    <>
          <StateContext.Provider value={{state, handleState}}>
          {props.children}
          </StateContext.Provider>
    </>
  )
}
