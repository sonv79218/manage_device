import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Bạn không có quyền truy cập</h2>
      <p className="text-gray-600 mb-6">Trang này yêu cầu quyền truy cập đặc biệt.</p>
      <button
        onClick={handleGoBack}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Quay lại
      </button>
    </div>
  );
};

export default Unauthorized;
