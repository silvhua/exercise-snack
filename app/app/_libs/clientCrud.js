"use server"

import apiInstance from "./ApiClient"


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
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