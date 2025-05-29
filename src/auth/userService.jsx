import axiosInstance from '../components/api/axiosInstance';
import { saveToken } from './tokenUtils';

const getLocations = async () => {
  const response = await axiosInstance.get('/auth/locations');
  return response.data;
};

const gettickets = async () => {
  const response = await axiosInstance.get('/auth/getticketsData');
  return response.data;
};
const saveUserTiketData = async (credentials) => {
  const response = await axiosInstance.post('/auth/tickets', credentials);
  return response.data;
};
const getcategories = async (categoryId) => {
  const response = await axiosInstance.get('/auth/categories-with-sub', {
    params: { categoryId },
  });
  return response.data;
};

export default {
  getLocations,gettickets,getcategories,saveUserTiketData
};
