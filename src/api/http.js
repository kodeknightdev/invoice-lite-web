import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7180',
});

export default http;
