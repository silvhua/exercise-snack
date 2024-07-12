"use server"

import apiInstance from "./ApiClient"


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
  return response;
}

export async function readProgram(userId) {
  const response = await apiInstance.get(`users/${userId}/programs`);
  return response;
}

export async function generateProgram(filterString) {
  let endpoint = 'programs';
  if (filterString) {
    endpoint += `?query=${filterString}`
  }
  const response = await apiInstance.get(endpoint);
  return response;
}

export async function saveProgram(userId, programArray) {
  const requestObject = {
    exercises: programArray
  }
  const response = await apiInstance.post(
    `users/${userId}/programs`, requestObject
  );
  return response;
}

export async function updateProgram(userId, programArray) {
  const requestObject = {
    exercises: programArray
  }
  const response = await apiInstance.put(
    `users/${userId}/programs`, requestObject
  );
  return response;
}

export async function getExerciseDetails(exerciseId) {
  const response = await apiInstance.get(`exercises/${exerciseId}`);
  return response;
}

export async function getExerciseProperty(exerciseId, property) {
  const response = await apiInstance.get(
    `exercises/${exerciseId}/${property}`
  );
  return response;
}

export async function getUser(username) {
  const response = await apiInstance.get(`auth/${username}`)
  return response;
}

export async function getLastWeeksSessions(userId) {
  const response = await apiInstance.get(
    `users/${userId}/sessions/recent`
  );
  return response;
}

export async function getUserSessions(userId) {
  const response = await apiInstance.get(
    `users/${userId}/sessions`
  );
  return response;
}

export async function getFilteredSessions(userId, filterString) {
  /* 
  2024-07-11 21:29 Not currently used
  */
  filterString = encodeURIComponent(
    'created_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
  )
  const response = await apiInstance.get(
    `users/${userId}/sessions?filter=${filterString}`
    );
  return response;
  }
