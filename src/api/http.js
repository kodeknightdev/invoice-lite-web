import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7180',
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
