'use client'
 
import { createContext } from 'react'
import { useEffect, useState } from "react";
import { getStreak } from "@/app/_libs/userData";
import { checkForSuccess } from '@/app/_libs/ApiClient';
import {getLastWeeksSessions} from '@/app/_libs/clientCrud';

export const DataContext = createContext({});
 
export default function DataProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [streakValue, setStreakValue] = useState(null);
  const [recentSessions, setRecentSessions] = useState(null);
  // const [programArray, setProgramArray] = useState(null);

  const context = {
    userObject: userObject,
    setUserObject: setUserObject,
    streakValue: streakValue,
    recentSessions: recentSessions,
    // setStreakValue: setStreakValue,
    // setRecentSessions: setRecentSessions
    // programArray: programArray,
    // setProgramArray: setProgramArray
  }
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
    loadRecentSessions(storedUserInfo.id);
  }, []);



  async function loadRecentSessions(userId) {
    const streakResponse = await getStreak(userId);
    setStreakValue(streakResponse);
    const sessionsResponse = await getLastWeeksSessions(userId);
    if (checkForSuccess(sessionsResponse)) {
      setRecentSessions(sessionsResponse);
    }
  }

  if (!userObject) {
    return;
  }

  
  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>

  )
}