'use client'
 
import { createContext } from 'react'
import { useEffect, useState } from "react";

export const DataContext = createContext({});
 
export default function DataProvider({ children }) {
  const [streakValue, setStreakValue] = useState(null);
  const [recentSessions, setRecentSessions] = useState(null);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {

  })


  const verifyUser = async (event) => {
    event.preventDefault();
    const formUsername = event.target.username.value || 'silvhua'; /////
    if (formUsername?.length > 1) {
      const response = await getUser(formUsername);
      if (response)  {
        setUserObject(response);
      }
    }
  }
  
  async function loadRecentSessions() {
    if (userId) {
      const streakResponse = await getStreak(userId);
      setStreakValue(streakResponse);
      const sessionsResponse = await getLastWeeksSessions(userId);
      if (checkForSuccess(sessionsResponse)) {
        setRecentSessions(sessionsResponse);
      }
    }
  }
  
  return (
    <DataContext.Provider value="dark">
      {children}
    </DataContext.Provider>

  )
}