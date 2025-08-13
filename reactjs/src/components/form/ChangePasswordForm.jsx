import React, { useState } from 'react';
import api from '../../config/api';
import { toast,ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // đường dẫn tùy dự án bạn
import axios from 'axios';

const ChangePasswordForm = ({ onCancel }) => {
  const {user} = useAuth();
    const userId = user?.id || user?.sub;
    console.log(userId);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      // setError('Mật khẩu mới không khớp');
      toast.error('Mật khẩu mới không khớp',{position: 'top-center',autoClose: 2000,});
      return;
    }


try {
      // TODO: Gọi API đổi mật khẩu
    // console.log('Đổi mật khẩu với:', formData);
    
//   const response =  await api.patch(`/user/${userId}/password`, {
// formData
// });
 const response =  await api.patch(`/user/${userId}/password`, {
  oldPassword: formData.currentPassword,
  newPassword: formData.newPassword,
});
  // console.log(response);
      toast.success('Thay đổi thông tin thành công', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => {
          onCancel();
        },  }
    );
    } catch (err) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message || 'Lỗi không xác định';
    toast.error(message,{position: 'top-center',}); // Hiển thị lỗi cụ thể từ backend
  } else {
    toast.error('Lỗi hệ thống');
  }
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className=" bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đổi mật khẩu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* {error && <p className="text-red-500">{error}</p>} */}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ChangePasswordForm;
