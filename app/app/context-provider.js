'use client'
 
import { createContext } from 'react'
import { useEffect, useState } from "react";

export const DataContext = createContext({});
 
export default function DataProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [programArray, setProgramArray] = useState(null);

  const context = {
    userObject: userObject,
    setUserObject: setUserObject,
    programArray: programArray,
    setProgramArray: setProgramArray
  }
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
    const sessionProgramArray = sessionStorage.getItem('userProgram');
    setProgramArray(JSON.parse(sessionProgramArray));
  }, []);

  if (!userObject) {
    return;
  }

  
  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>

  )
}