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

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

export default http;
