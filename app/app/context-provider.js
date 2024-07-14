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
  const [streakValue, setStreakValue] = useState(null);
  const [recentSessions, setRecentSessions] = useState(null);
  const [programArray, setProgramArray] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('');

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

    if (!programArray) {
      loadProgram(userId);
    } 
  }, []);

  async function loadRecentSessions(userId) {
    const streakResponse = await getStreak(userId);
    setStreakValue(streakResponse);
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

  if (!userObject || !programArray) {
    return;
  }
  
  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>

  )
}