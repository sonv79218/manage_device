import React, { useState } from 'react';
import api from '../../config/api';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';

const AddNewDeviceForm = ({ onClose,onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    status: 'available',
    serial_number: '',
    note: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/product', formData);
      toast.success('Thêm thiết bị thành công!', {
        autoClose: 2000,
        onClose: onClose,
        position: 'top-center',
      });
      onSuccess();
      // khi thnahf công gọi lại api ??
    } catch (error) {
      toast.error('Thêm thiết bị thất bại.', {
        autoClose: 2000,
        onClose: onClose,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Thêm Thiết Bị Mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} required placeholder="Tên thiết bị" className="w-full p-2 border rounded" />
          <input name="type" value={formData.type} onChange={handleChange} required placeholder="Loại thiết bị" className="w-full p-2 border rounded" />
          <input name="brand" value={formData.brand} onChange={handleChange} required placeholder="Thương hiệu" className="w-full p-2 border rounded" />
          <input name="serial_number" value={formData.serial_number} onChange={handleChange} required placeholder="Số serial" className="w-full p-2 border rounded" />
          <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Ghi chú" className="w-full p-2 border rounded" />

          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="bg-gray-500">Hủy</Button>
            <Button type="submit" disabled={loading}>
              Gửi {loading && <LoadingSpinner />}
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddNewDeviceForm;
