import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BorrowRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // lấy dữ liệu 
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/borrow-request', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy yêu cầu mượn:', err);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
        // chấp nhận
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/borrow-request/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
      );
       toast.success('Đã duyệt',{position: "top-center",autoClose: 1000})
    } catch (err) {
       toast.error('Duyệt thất bại',{position: "top-center",autoClose: 1000})
    }
  };
    const handleReject = async (id) => {
    try {
      // id đc truyền vào là của product 
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/borrow-request/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
      );
       toast.success('Đã từ chối',{position: "top-center",autoClose: 1000})
    } catch (err) {
       toast.error('Từ chối không thành công',{position: "top-center",autoClose: 1000})
    }
  };

  return (
    <div className="p-4">
      <ToastContainer></ToastContainer>
      <h1 className="text-2xl font-bold mb-4">Yêu cầu mượn thiết bị</h1>
      {requests.length === 0 ? (
        <p>Không có yêu cầu nào.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Device ID</th>
              <th className="border p-2">Ghi chú</th>
              <th className="border p-2">Ngày trả dự kiến</th>
              <th className="border p-2">Ngày yêu cầu</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{req.user.name}</td>
                <td className="border p-2">{req.product.name}</td>
                <td className="border p-2">{req.note}</td>
                <td className="border p-2">{new Date(req.expectedReturnDate).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(req.createdAt).toLocaleString()}</td>
                <td className="border p-2 capitalize">{req.status}</td>
                <td className="border p-2">
                  {req.status === 'pending' && (<>
                                    <button
                      onClick={() => handleApprove(req.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Duyệt
                    </button>
                    
                     <button
                      onClick={() => handleReject(req.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Từ chối
                    </button>
                  </>
  
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default BorrowRequestsAdmin;
