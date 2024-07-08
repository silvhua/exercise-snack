"use server"

import apiInstance from "./ApiClient"
import program from '@/app/_libs/dataProcessing';


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
  return response;
}

export async function generateProgram() {
  const exerciseArray = await apiInstance.get('programs');
  // console.log(exerciseArray);
  return exerciseArray;
}