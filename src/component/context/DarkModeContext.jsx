import React, { createContext, useState } from 'react'

export const DarkModeContext = createContext();

export function DarkModeProvider(props) {
     const [theme, setTheme] = useState('light');

     return (
          <>
               <DarkModeContext.Provider value={{theme, setTheme}}>
                    {props.children}
               </DarkModeContext.Provider>
          </>
     )
}
