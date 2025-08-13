import React from 'react';
import Button from '../common/Button';
// nhận tên, trạng thái, onRequest, onreturn
const Card = ({ title, status,type,serial_number, onRequest, onReturn,hasRequested}) =>{ 
  return(
  
  <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Trạng thái: {status}</p>
    <p className="text-sm text-gray-500">Loại: {type}</p>
    <p className="text-sm text-gray-500">Số serial: {serial_number}</p>
    {/* nút nhấn */}
  <>   
   {status === 'maintenance' && (
      <Button className="mt-2 w-full">Bảo trì</Button>
    )}

    {status === 'available' && (
      hasRequested ? (
        <Button disabled className="bg-gray-400 text-white px-4 py-2 rounded">
          Đã gửi yêu cầu
        </Button>
      ) : (
        <Button onClick={onRequest} className="mt-2 w-full">
          Gửi yêu cầu
        </Button>
      )
      
    )}
    {status === 'assigned' && (
      <Button onClick={onReturn} className="mt-2 w-full">Có người sử dụng</Button>
    )}
  </>
  </div>
);
}
export default Card;