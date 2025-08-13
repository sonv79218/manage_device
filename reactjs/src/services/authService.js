import axios from 'axios';

const API_URL = 'https://api.example.com';

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.token;
};

export default { login };