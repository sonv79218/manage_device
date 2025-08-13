import React from 'react';

const CardUser = ({ title, status, children, onDelete }) => {
  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    returned: 'bg-gray-100 text-gray-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <span
        className={`px-2 py-1 rounded text-sm font-medium w-fit mb-3 ${statusColor[status] || 'bg-gray-100 text-gray-700'}`}
      >
        {status}
      </span>

      <div className="flex-1 mb-3">{children}</div>

      {status === 'pending' ? (
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
        >
          Hủy yêu cầu
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md w-full cursor-not-allowed"
        >
          Không thể hủy
        </button>
      )}
    </div>
  );
};

export default CardUser;
