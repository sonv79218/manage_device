import axios from 'axios';

const API_URL = 'https://api.example.com';

const borrowDevice = async (data) => {
  await axios.post(`${API_URL}/borrow`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export default { borrowDevice };