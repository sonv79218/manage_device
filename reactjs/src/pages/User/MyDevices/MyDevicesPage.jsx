import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import Container from '../../components/layout/Container';
// import CardUser from '../components/card/CardUser';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import api from '../../../config/api';
import { toast, ToastContainer } from 'react-toastify';

const CardUser = ({ title, status, children, onReturn }) => {
  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    assigned: 'bg-blue-100 text-blue-700',
    returned: 'bg-gray-100 text-gray-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const canReturn = status === 'approved' || status === 'assigned';

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <span
        className={`px-2 py-1 rounded text-sm font-medium w-fit mb-3 ${
          statusColor[status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {status}
      </span>

      <div className="flex-1 mb-3">{children}</div>

      {canReturn ? (
        <button
          onClick={onReturn}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
        >
          Trả thiết bị
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md w-full cursor-not-allowed"
        >
          Không thể trả
        </button>
      )}
    </div>
  );
};
const MyDevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const response = await api.get('/borrow-request/my');
      setDevices(response.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách thiết bị:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleReturn = async (borrowRequestId) => {
    if (!window.confirm('Bạn có chắc muốn trả thiết bị này?')) return;
    try {
      await api.patch(`/borrow-request/return/${borrowRequestId}`);

      // Cập nhật ngay trong state để UI đổi màu nút + trạng thái
      setDevices(prev =>
        prev.map(req =>
          req.id === borrowRequestId ? { ...req, status: 'returned' } : req
        )
      );
toast.error('Đã gửi yêu cầu trả thành công',{position: "top-center",autoClose: 1000})
      // setMessage('Đã gửi yêu cầu trả thành công.');
      // cập nhật lại api 
      fetchDevices();
    } catch (err) {
      // console.error(err);
      // setMessage('Gửi yêu cầu trả thất bại.');
      toast.error('Gửi yêu cầu trả thất bại',{position: "top-center",autoClose: 1000})
    }
    // setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4">Thiết bị của tôi</h2>
      {/* {message && <p className="text-green-500 mb-4 text-center">{message}</p>} */}

      {loading ? (
        <LoadingSpinner />
      ) : devices.length === 0 ? (
        <p>Chưa có thiết bị nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((req) => (
            <CardUser
              key={req.id}
              title={req.product.name}
              status={req.status}
              onReturn={() => handleReturn(req.id)}
            >
              <p className="text-sm text-gray-500">Loại: {req.product.type}</p>
              <p className="text-sm text-gray-500">Hãng: {req.product.brand}</p>
              <p className="text-sm text-gray-500">Serial: {req.product.serial_number}</p>
              <p className="text-sm text-gray-500">Ghi chú: {req.note}</p>
              <p className="text-sm text-gray-500">
                Ngày mượn: {new Date(req.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Ngày trả dự kiến: {new Date(req.expectedReturnDate).toLocaleDateString()}
              </p>
            </CardUser>
          ))}
        </div>
      )}
    </div>
  );
};


export default MyDevicesPage;
