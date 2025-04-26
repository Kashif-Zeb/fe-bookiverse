// api.js
import axios from 'axios';
import apiEndpoint from './apiEndpoint';
const api = axios.create({
  baseURL: apiEndpoint, // your backend URL
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and not retry yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post(`${apiEndpoint}/refresh`, {
          refresh_token: refreshToken
        });

        const newAccessToken = res.data.access_token;

        localStorage.setItem('access_token', newAccessToken);

        // Update Authorization header and retry original request
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.log('Refresh token expired. Please login again.');
        // logout the user or redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_details')
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
