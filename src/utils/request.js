// Encapsulate and handle of axios
import axios from "axios";
import { getToken } from "./token";

const request = axios.create({
  baseURL:'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// Request interceptor
request.interceptors.request.use((config) => {
  // Inject token data into config
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`  //Concatenate according to the backend
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export { request }