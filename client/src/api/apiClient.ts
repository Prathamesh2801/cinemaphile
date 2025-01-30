import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // This will be proxied through Vite
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Enhanced error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    console.error('Request that failed:', {
      method: error.config?.method,
      url: error.config?.url,
      params: error.config?.params
    });
    return Promise.reject(error);
  }
);

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with params:', config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;