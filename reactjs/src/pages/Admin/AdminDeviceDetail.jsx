// src/pages/admin/AdminDeviceDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../config/api';

const AdminDeviceDetail = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin thiết bị
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await api.get(`/product/${deviceId}`);
        setDevice(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thiết bị:', error);
      }
    };
    fetchDevice();
  }, [deviceId]);

  // Lấy danh sách borrow-request liên quan đến thiết bị
  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const res = await api.get('/borrow-request');
        const filtered = res.data.filter(
          (item) => item.product.device_id === deviceId
        );
        setRequests(filtered);
      } catch (error) {
        console.error('Lỗi khi lấy borrow-request:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowRequests();
  }, [deviceId]);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (!device) return <div className="p-4">Không tìm thấy thiết bị</div>;

  // Tính thống kê theo trạng thái
  const totalRequests = requests.length;
  const byStatus = requests.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-white shadow rounded max-w-4xl mx-auto">
      {/* Thông tin thiết bị */}
      <h2 className="text-xl font-bold mb-4">Thông tin thiết bị</h2>
      <p><strong>ID:</strong> {device.device_id}</p>
      <p><strong>Tên:</strong> {device.name}</p>
      <p><strong>Loại:</strong> {device.type}</p>
      <p><strong>Số Serial:</strong> {device.serial_number}</p>
      <p><strong>Trạng thái:</strong> {device.status}</p>
      <p><strong>Mô tả:</strong> {device.description}</p>

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
            <th className="border px-2 py-1">Người mượn</th>
            <th className="border px-2 py-1">Ghi chú</th>
            <th className="border px-2 py-1">Ngày trả dự kiến</th>
            <th className="border px-2 py-1">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="border px-2 py-1">{r.id}</td>
              <td className="border px-2 py-1">{r.user.name}</td>
              <td className="border px-2 py-1">{r.note}</td>
              <td className="border px-2 py-1">
                {new Date(r.expectedReturnDate).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin" className="text-blue-500 hover:underline block mt-4">
        ← Quay lại danh sách thiết bị
      </Link>
    </div>
  );
};

export default AdminDeviceDetail;
