import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../config/api'; // hoặc axios.create({...})

const RegisterPage = () => {
  // các trường 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // setError('');

    if (!name || !email || !password || !confirmPassword) {
      const msg = 'Vui lòng điền đầy đủ thông tin.';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Mật khẩu và xác nhận mật khẩu không khớp.';
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
       await api.post('/auth/register', {
        name,
        email,
        password,
        confirmPassword,
      });
// thông báo 
      toast.success('Đăng ký thành công!',{position: "top-center",autoClose: 2000,});
      // navigate('/login');
    } catch (err) {
    const msg = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
{/* 
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )
        } */}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Tên đăng nhập</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Đăng ký
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-3 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Quay lại
          </button>
        </form>
        <ToastContainer position="top-center"/>
      </div>
    </div>
  );
};

export default RegisterPage;
