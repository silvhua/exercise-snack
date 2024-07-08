"use server"

import apiInstance from "./ApiClient"


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
  return response;
}

export async function generateProgram() {
  const exerciseArray = await apiInstance.get('programs');
  return exerciseArray;
}