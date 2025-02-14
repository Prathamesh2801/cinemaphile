import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? 'https://cinemaphile-server.onrender.com/api'
  : 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;