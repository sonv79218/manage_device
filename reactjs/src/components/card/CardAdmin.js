import React, { useState } from "react";
import Button from "../common/Button";
// nhận tên, trạng thái, onRequest, onreturn
import api from "../../config/api";
import { Link } from "react-router-dom";
// import UpdateDeviceForm from "../form/UpdateDeviceForm";

const CardAdmin = ({
  device_id,
  title,
  status,
  type,
  serial_number,
  onSuccess,
  onEditClick,
}) => {
  const deleteDevice = async () => {
    // console.log(device_id);
    const confirmed = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmed) return;
    await api.delete(`/product/${device_id}`);
    // cập nhật lại giao diện // bằng cách gọi lại api
    onSuccess();
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
      <>
      <Link to={`/admin/device/${device_id}`}>
 <h3 className="text-lg font-semibold">{title}</h3>
</Link>
        
        <p className="text-gray-600">Trạng thái: {status}</p>
        <p className="text-sm text-gray-500">Loại: {type}</p>
        <p className="text-sm text-gray-500">Số serial: {serial_number}</p>
        <Button onClick={deleteDevice}>xóa</Button>
        <Button
          onClick={() => {
            onEditClick();
          }}
        >
          sửa
        </Button>
      </>
    </div>
  );
};
export default CardAdmin;
