import axios from "axios";

// const blogApi = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // NestJS backend
// });
const blogApi = axios.create({
  baseURL: 'http://localhost:5000', // NestJS backend
});

blogApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default blogApi;