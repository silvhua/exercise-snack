'use client'
 
import { createContext } from 'react'
import { useEffect, useState } from "react";
import { getStreak } from "@/app/_libs/userData";
import { checkForSuccess } from '@/app/_libs/ApiClient';
import {getLastWeeksSessions} from '@/app/_libs/clientCrud';
import postData, { generateProgram, readProgram, saveProgram } from '@/app/_libs/clientCrud';

export const DataContext = createContext({});
 
export default function DataProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [streakValue, setStreakValue] = useState({
    id: 'dummyId', 
    consecutive_days: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [programArray, setProgramArray] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const context = {
    userObject: userObject,
    setUserObject: setUserObject,
    streakValue: streakValue,
    recentSessions: recentSessions,
    programArray: programArray,
    setProgramArray: setProgramArray,
    placeholderText
    // setStreakValue: setStreakValue,
    // setRecentSessions: setRecentSessions
  }
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
    const userId = storedUserInfo.id
    loadRecentSessions(userId);
    sessionStorage.lastActivityDate = null;
    if (!programArray) {
      loadProgram(userId);
    } 
    setIsLoading(false);
  }, []);

  async function loadRecentSessions(userId) {
    const streakResponse = await getStreak(userId);
    if (checkForSuccess(streakResponse)) {
      setStreakValue(streakResponse);
    }
    const sessionsResponse = await getLastWeeksSessions(userId);
    if (checkForSuccess(sessionsResponse)) {
      setRecentSessions(sessionsResponse);
    }
  }

  async function  loadProgram (userId) {
    const storedProgramResponse = await readProgram(userId);
    if (checkForSuccess(storedProgramResponse)) {
      const storedProgram = JSON.parse(storedProgramResponse.exercises);
      setProgramArray(storedProgram);
    } else {
      setPlaceholderText('Creating your program...');
      getNewProgram(userId);
    }
  }

  async function  getNewProgram (userId) {
    const createProgramResponse = await generateProgram();
    if (checkForSuccess(createProgramResponse)) {
      setProgramArray(createProgramResponse);
      const postProgramResponse = await saveProgram(
        userId, 
        createProgramResponse
      );
    } else {
      console.log('error:')
    }
  }

  if (isLoading) {
    return;
  }
  
  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>

  )
}