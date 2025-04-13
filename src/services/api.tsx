import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://6256fc506ea7037005434e84.mockapi.io/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token && config.headers) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
