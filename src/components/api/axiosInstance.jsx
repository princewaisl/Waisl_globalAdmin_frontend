import axios from 'axios';
import { getToken } from '../../auth/tokenUtils';

const axiosInstance = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// Request interceptor for token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
