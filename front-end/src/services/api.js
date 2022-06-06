import axios from 'axios';
// import 'dotenv/config';

const URL = `http://${process.env.REACT_APP_HOSTNAME}` || 'localhost';
const PORT = `${process.env.REACT_APP_BACKEND_PORT}` || '3001';

const api = axios.create({
  baseURL: `${URL}:${PORT}`,
});

export const executeLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
