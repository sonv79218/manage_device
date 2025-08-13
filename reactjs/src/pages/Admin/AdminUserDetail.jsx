import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../config/api';

const AdminUserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  // Lấy danh sách borrow-request của user
  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const res = await api.get(`/borrow-request`);
        // Lọc theo userId
        const filtered = res.data.filter(
          (item) => item.user.id === userId
        );
        setRequests(filtered);
      } catch (error) {
        console.error('Lỗi khi lấy borrow-request:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowRequests();
  }, [userId]);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (!user) return <div className="p-4">Không tìm thấy người dùng</div>;

  // Tính thống kê
  const totalRequests = requests.length;
  const byStatus = requests.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-white shadow rounded max-w-2xl mx-auto">
      {/* Thông tin user */}
      <h2 className="text-xl font-bold mb-4">Thông tin người dùng</h2>
      <p><strong>ID:</strong> {user.sub || user.id}</p>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Vai trò:</strong> {user.role}</p>

      {/* Thống kê mượn thiết bị */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Thống kê mượn thiết bị</h3>
      <p><strong>Tổng số yêu cầu:</strong> {totalRequests}</p>
      <ul className="list-disc list-inside">
        {Object.entries(byStatus).map(([status, count]) => (
          <li key={status}>
            {status}: {count}
          </li>
        ))}
      </ul>

      {/* Danh sách yêu cầu */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Chi tiết yêu cầu</h3>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Thiết bị</th>
            <th className="border px-2 py-1">Ghi chú</th>
            <th className="border px-2 py-1">Ngày trả dự kiến</th>
            <th className="border px-2 py-1">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="border px-2 py-1">{r.id}</td>
              <td className="border px-2 py-1">{r.product.name}</td>
              <td className="border px-2 py-1">{r.note}</td>
              <td className="border px-2 py-1">
                {new Date(r.expectedReturnDate).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/user" className="text-blue-500 hover:underline block mt-4">
        ← Quay lại danh sách
      </Link>
    </div>
  );
};

export default AdminUserDetail;
