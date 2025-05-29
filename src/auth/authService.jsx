import axiosInstance from '../components/api/axiosInstance';
import { saveToken } from './tokenUtils';

const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  saveToken(response.data.token);
  return response.data;
};

const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response;
};

export default {
  loginUser,
  registerUser,
};
