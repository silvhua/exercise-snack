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

export async function generateProgram() {
  const response = await apiInstance.get('programs');
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
