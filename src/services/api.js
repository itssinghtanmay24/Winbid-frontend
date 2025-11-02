import axios from 'axios';

// Get API URL from environment variable
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  const isProduction = import.meta.env.PROD;
  
  // In production mode, always use production URL (ignore any localhost settings)
  if (isProduction) {
    return 'https://winbid-node-js.onrender.com/api';
  }
  
  // In development, use env variable if set and not localhost
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    // If env URL already ends with /api, use it as is, otherwise append /api
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  
  // Fallback to production URL
  return 'https://winbid-node-js.onrender.com/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;