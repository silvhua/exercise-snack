import axios from "axios";
import 'dotenv/config';

class ApiClient {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  createRequestUrl(endpoint) {
    const requestUrl = `${this.baseUrl}/${endpoint}`;
    console.log(requestUrl)
    return requestUrl;
  }

  logResponse(response, endpoint, verb) {
    // Helper method to perform console.log() on API response objects.
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

  async put(route, id, bodyObject) {
    /* 
    */
    try {
      const endpoint = `api/${route}/${id}`;
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

  async delete(route, id) {
    try {
      const endpoint = `api/${route}/${id}`;
      const requestUrl = this.createRequestUrl(endpoint);
      const response = await axios.delete(requestUrl);
      return response;
    } catch (error) {
      return false;
    }
  }

  async get(route) {
    /* Helper method for making GET requests (following DRY principle). */
    const endpoint = `api/${route}`;
    const requestUrl = this.createRequestUrl(endpoint);
    try {
      const response = await axios.get(requestUrl);
      const data = response.data;
      // this.logResponse(response, endpoint, 'GET');
      return data;
    } catch (error) {
      const responseMessage = await error.response.data;
      console.log(responseMessage);
      return false;
    }
  }

  // async getItemsArray(route) {
  //   const endpoint = `api/${route}`;
  //   const itemsArray = await this.get(endpoint);
  //   return itemsArray;
  // }

  // async getItem(route, id) {
  //   /* 
  //   This is a docstring for how to use the function.

  //   A24W5-26 API to GET a Single Inventory Item 
  //   */
  //   const endpoint = `api/${route}/${id}`;
  //   const data = await this.get(endpoint);
  //   return data;
  // }
}

const apiInstance = new ApiClient();
export default apiInstance;
