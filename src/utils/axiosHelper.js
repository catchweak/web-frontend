import axios from 'axios';
import property from '@configs/propertyConfig';
const server = property.catchweekServerHost;

const axiosClient = axios.create({
  baseURL: `${server}`,
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ' '
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Promise.reject(error);
})


export default axiosClient;
