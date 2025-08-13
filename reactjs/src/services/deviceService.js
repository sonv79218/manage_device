import axios from 'axios';

const API_URL = 'https://api.example.com';

const getDevices = async () => {
  const response = await axios.get(`${API_URL}/devices`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const getMyDevices = async () => {
  const response = await axios.get(`${API_URL}/devices/my`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const borrowDevice = async (data) => {
  await axios.post(`${API_URL}/borrow`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};


export default {
  getDevices,
  getMyDevices,
  borrowDevice,
};
