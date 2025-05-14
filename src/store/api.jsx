// api.js
import axios from 'axios';
import apiEndpoint from './apiEndpoint';


let isRefreshing = false;
let failedRequestsQueue = [];

const axiosInstance = axios.create({
  baseURL: apiEndpoint, // your backend URL
  withCredentials:true,
  headers:{
    'Content-Type':'application/json'
  }
});
//set authorization header if token exist
const token = sessionStorage.getItem('access_token');
if (token){
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
// response interceptor to handle empty token
axiosInstance.interceptors.response.use(
  response => response,
  async(error)=>{
    const originalRequest = error.config;
    // check for 401 unauthorized token expire
    console.log("error", error)
    if (error.response && (error.response.status===401) && !originalRequest._retry){
      console.log("401 occured")
      originalRequest._retry = true
      const refresh_token = sessionStorage.getItem("refresh_token")
      if (!refresh_token){
        window.location.href = '/login'
        return Promise.reject(error)
      }
      // if a refresh request is already in progress queue the failed requests
      if (isRefreshing){
        return new Promise((resolve,reject)=>{
          failedRequestsQueue.push({resolve,reject,originalRequest})
        })
      }
      isRefreshing=true
      try{
        // refresh the token
        const response = await axios.post(`${apiEndpoint}/api/refresh`,{refresh_token:refresh_token})
        const {access_token,refresh_token} = response.data
        sessionStorage.setItem('access_token',access_token)
        sessionStorage.setItem('refresh_token',refresh_token)
        

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        originalRequest.headers['Authorization'] = `Bearer ${access_token}`
        const retryOriginalRequest = axiosInstance(originalRequest)

        failedRequestsQueue.forEach(({resolve,originalRequest})=>{
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`
          resolve(axiosInstance(originalRequest))
        });
        failedRequestsQueue = [];
        return retryOriginalRequest
      }
      catch(err){
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        failedRequestsQueue.forEach(({reject})=> reject(err));
        failedRequestsQueue = []
        return Promise.reject(err)
      }
      finally{
        isRefreshing=true
      }
    }
    return Promise.reject(error)
    }
)
export default axiosInstance


