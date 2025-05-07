// api.js
import axios from 'axios';
import apiEndpoint from './apiEndpoint';
const api = axios.create({
  baseURL: apiEndpoint, // your backend URL
});

// Request interceptor to add auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedRequests = [];

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried a refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token available - logout user
          throw new Error('No refresh token available');
        }
        
        // Call your refresh token endpoint
        const response = await axios.post(`${apiEndpoint}/refresh`, {
          refreshToken
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Update tokens in storage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        
        // Update Authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Retry all queued requests
        failedRequests.forEach(prom => prom.resolve());
        failedRequests = [];
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        failedRequests.forEach(prom => prom.reject(refreshError));
        failedRequests = [];
        
        // Clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_details')
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;