
import { jwtDecode } from "jwt-decode";

// Save token
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Decode token
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // returns an object with payload like { role, sub, exp }
  } catch (error) {
    console.error("Invalid Token");
    return null;
  }
};
