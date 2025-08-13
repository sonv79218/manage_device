import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
import CardUser from '../../../components/card/CardRequested';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import api from '../../../config/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyRequestedPage = () => {
  const [requests, setRequests] = useState([]);
  // const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
// lấy yêu cầu của tôi - pending
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/borrow-request/me');
        setRequests(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);
// trả 
  // const handleReturn = async (deviceId) => {
  //   try {
  //     await api.post('/returns', { deviceId });
  //     // setMessage('Đã gửi yêu cầu trả thành công.');
  //     setRequests((prev) => prev.filter(req => req.product.device_id !== deviceId));
  //     toast.success('Đã gửi yêu cầu trả thành công',{position: "top-center",autoClose: 1000})
  //   } catch (err) {
  //     // setMessage('Gửi yêu cầu trả thất bại.');
  //     toast.error('Gửi yêu cầu trả thất bại',{position: "top-center",autoClose: 1000})
  //   }
  //   // setTimeout(() => setMessage(''), 3000);
  // };
  
  // Hàm hủy yêu cầu
  const handleDelete = async (requestId) => {
    if (!window.confirm('Bạn có chắc muốn hủy yêu cầu này?')) return;
    try {
      await api.delete(`/borrow-request/${requestId}`);
      // setMessage('Đã hủy yêu cầu thành công.');
      toast.success('Đã hủy yêu cầu thành công',{position: "top-center",autoClose: 1000})
      setRequests((prev) => prev.filter((req) => req.id !== requestId));

    } catch (err) {
      // console.error(err);
      // setMessage('Hủy yêu cầu thất bại.');
      toast.error('Hủy yêu cầu thất bại',{position: "top-center",autoClose: 1000})
    }
    // setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Yêu cầu của tôi</h2>
      {/* {message && <p className="text-green-500 mb-4 text-center">{message}</p>} */}

      {loading ? (
        <LoadingSpinner />
      ) : requests.length === 0 ? (
        <p>Chưa có thiết bị nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => {
            const { product, status, note, createdAt, expectedReturnDate, id } = req;
            return (
              <CardUser
                key={id}
                title={product.name}
                status={status}
                // onReturn={() => handleReturn(product.device_id)}
                onDelete={() => handleDelete(id)}
              >
                <p className="text-sm text-gray-500">Loại: {product.type}</p>
                <p className="text-sm text-gray-500">Hãng: {product.brand}</p>
                <p className="text-sm text-gray-500">Serial: {product.serial_number}</p>
                <p className="text-sm text-gray-500">Ghi chú: {note}</p>
                <p className="text-sm text-gray-500">Ngày mượn: {new Date(createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Ngày trả dự kiến: {new Date(expectedReturnDate).toLocaleDateString()}</p>
              </CardUser>
            );
          })}
        </div>
        
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyRequestedPage;
