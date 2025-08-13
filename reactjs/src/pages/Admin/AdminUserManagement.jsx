import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import api from '../../config/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserManagement = () => {
  // lưu mảng user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      //   const response = await axios.get('/api/users'); // Thay đổi endpoint đúng theo backend bạn
      const res = await api.get('/user');
      setUsers(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddSuccess = () => {
    fetchUsers(); // gọi lại khi thêm thành công
  };

  // Đổi vai trò người dùng
  const handleToggleRole = async (userId, currentRole, handleAddSuccess) => {
    // const [role,setRole] = useState(currentRole);
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    // console.log(newRole)
    try {
      // console.log(userId)
      await api.patch(`user/${userId}/toggle-role`); // gọi API đổi role
      handleAddSuccess();
      // // chắc phải gọi lại hàm lấy api
      // setUsers((prev) =>
      //   prev.map((u) =>
      //     u.sub === userId ? { ...u, role: newRole } : u
      //   )
      // );
      toast.success('Đã đổi quyền thành công', {
        position: 'top-center',
        autoClose: 2000,
      });
      // console.log('đổi quyền thành công cho bạn này')
    } catch (error) {
      console.error(
        'Lỗi khi cập nhật vai trò:',
        error.response?.data || error.message
      );
    }
  };

  if (loading) return <div className="text-center py-10">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Quản lý người dùng
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Tên</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Vai trò</th>
              <th className="p-3 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.sub} className="hover:bg-gray-50">
                <td className="p-3 border-b">{index + 1}</td>
                {/* thêm link vào tên user */}
                <td className="p-3 border-b">  
                  <Link to={`/admin/user/${user?.sub || user?.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.name}
                </Link></td> 

                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b capitalize">{user.role}</td>
                <td className="p-3 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                    onClick={() =>
                      handleToggleRole(
                        user?.sub || user?.id,
                        user.role,
                        handleAddSuccess
                      )
                    }
                  >
                    {/* hiển thị giao diện này user role phải trở thành công tắc  */}
                    {user.role === 'admin'
                      ? 'Chuyển thành User'
                      : 'Chuyển thành Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <ToastContainer></ToastContainer>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
