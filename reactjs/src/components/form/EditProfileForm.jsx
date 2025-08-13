import React, { useState } from 'react';
import api from '../../config/api';
import { toast,ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // đường dẫn tùy dự án bạn
import axios from 'axios';

const EditProfileForm = ({ user, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const { updateUser } = useAuth(); // lấy setUser từ context
  const userId = user?.id || user?.sub;

// console.log(userId)
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      // console.log(formData);
      // console.log(userId);
      const response = await api.patch(`/user/${userId}`, formData);// phải có user id
      console.log(response)
      // đổi thông tin trong localStorage
          // ✅ Cập nhật localStorage + context
    localStorage.setItem('user', JSON.stringify(response.data));
    updateUser(response.data);

      
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
    toast.error(message,{position: 'top-center',autoClose: 2000,}); // Hiển thị lỗi cụ thể từ backend
  } else {
    toast.error('Lỗi hệ thống');
  }
      // toast.error('Thay đổi thất bại', {
      //   position: 'top-center',
      //   autoClose: 2000,
      //   onClose: () => {
      //     onCancel();
      //   },
      // });
    } 
    // finally {
    //   setLoading(false);
    // }
  };
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Chỉnh sửa thông tin cá nhân
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>

          </div>

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
              Lưu thay đổi
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfileForm;
