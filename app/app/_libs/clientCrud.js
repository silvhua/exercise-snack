"use server"

import apiInstance from "./ApiClient"


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
  // console.log('postData response\n', response)
  return response;
}

export async function generateProgram() {
  const response = await apiInstance.get('programs');
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
  const response = await apiInstance.get(`users/${username}`)
  return response;
}


