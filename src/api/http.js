import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7180',
});

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

http.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export default http;
