import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attribue le header Authorization avec le token à toutes les requêtes axios
http.interceptors.request.use(function (config)
{
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : 'abc';
  return config;
});

export default http;