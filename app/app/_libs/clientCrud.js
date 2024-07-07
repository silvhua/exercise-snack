"user server"

import apiInstance from "./ApiClient"


export default async function post (endpoint, data) {
  const response = await apiInstance.post('exercises');
  return response;
}