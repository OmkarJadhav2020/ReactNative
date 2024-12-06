import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.63.86:8000/api/accounts/',
});

export const login = async (credentials) => {
  console.log(credentials)
  const response = await API.post('login/',credentials)
  return response.data;
};

export const register = async (data) => {
  const response = await API.post('register/', data);
  return response.data;
};
