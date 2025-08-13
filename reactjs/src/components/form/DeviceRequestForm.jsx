import React, { useState } from 'react';
// import Form from '../form/Form';
import Button from '../common/Button';
import api from '../../config/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeviceRequestForm = ({ deviceId, onClose, onSuccess }) => {
  const [reason, setReason] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        note: reason,
        expectedReturnDate: expectedReturnDate, // gửi ngày người dùng chọn
      };

      await api.post(`/borrow-request/${deviceId}`, payload);

      toast.success('Yêu cầu mượn đã được gửi!', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => {
          onClose();
        },  }
    );
     onSuccess();
    } catch (err) {
      toast.error('Gửi yêu cầu thất bại', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => {
          onClose();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // để chặn chọn ngày trong quá khứ

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Yêu cầu mượn thiết bị</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Lý do</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập lý do mượn"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ngày trả dự kiến</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              min={today}
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} className="bg-gray-500">Hủy</Button>
            <Button type="submit" disabled={loading}>
              Gửi {loading && <LoadingSpinner />}
            </Button>
          </div>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default DeviceRequestForm;
