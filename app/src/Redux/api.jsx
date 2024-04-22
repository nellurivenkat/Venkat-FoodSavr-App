import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://venkat-foodsavr-app.onrender.com/api";

// Interceptor to attach authorization token to requests
const setupAxiosInterceptors = async () => {
  axios.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Function to handle errors and log out user if authentication fails
const handleError = (error) => {
  console.error("Error:", error);
  if (error.response && error.response.status === 401) {
    // Handle unauthorized access (e.g., log out user)
  }
  throw error;
};

// Function to make GET requests
export const getDataAPI = async (url) => {
  try {
    await setupAxiosInterceptors();
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make POST requests
export const postDataAPI = async (url, data) => {
  try {
    await setupAxiosInterceptors();
    const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make PUT requests
export const putDataAPI = async (url, data) => {
  try {
    await setupAxiosInterceptors();
    const response = await axios.put(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to make DELETE requests
export const deleteDataAPI = async (url) => {
  try {
    await setupAxiosInterceptors();
    const response = await axios.delete(`${API_BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
