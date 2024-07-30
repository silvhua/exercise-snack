import axios from "axios";
import 'dotenv/config';

class ApiClient {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  createRequestUrl(endpoint) {
    const requestUrl = `${this.baseUrl}/${endpoint}`;
    return requestUrl;
  }

  logResponse(response, endpoint, verb) {
    // Helper method to perform console.log() on API response objects during development.
    // Not invoked when submitted for grading by TAs.
    console.log(
      `${verb} API response status for "${endpoint}" endpoint: \n${response.status} - ${response.statusText}.`
    );
    console.log(`Data:`, response.data);
  }

  async post(route, bodyObject) {
    /* 
    */
    const endpoint = `api/${route}`;
    const requestUrl = this.createRequestUrl(endpoint);
    const headers = { "Content-Type": "application/json" };
    try {
      const response = await axios.post(requestUrl, bodyObject, headers);
      if (Math.floor(response.status / 100) === 2) {
        return response.data;
      }
    } catch (error) {
      const responseMessage = await error.response.data;
      return responseMessage;
    }
  }

  async put(route, bodyObject) {
    /* 
    */
    try {
      const endpoint = `api/${route}`;
      const requestUrl = this.createRequestUrl(endpoint);
      const response = await axios.put(requestUrl, bodyObject);
      if (Math.floor(response.status / 100) === 2) {
        return response.data;
      }
    } catch (error) {
      const responseMessage = await error.response.data;
      return responseMessage;
    }
  }

  async get(route) {
    /* Helper method for making GET requests (following DRY principle). */
    const endpoint = `api/${route}`;
    const requestUrl = this.createRequestUrl(endpoint);
    try {
      const response = await axios.get(requestUrl);
      const data = response.data;
      return data;
    } catch (error) {
      const responseMessage = await error.response.data;
      return responseMessage;
    }
  }
}

const apiInstance = new ApiClient();
export default apiInstance;


export function checkForSuccess(response) {
  if (response && typeof response === 'object') {
    return !response.error;
  } else {
    // console.error(`Response error in ApiClient: ${response?.error}`)
    return false
  }
}