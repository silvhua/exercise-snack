"use server"

import apiInstance from "./ApiClient"


export default async function postData (endpoint, data) {
  const response = await apiInstance.post(endpoint, data);
  return response;
}