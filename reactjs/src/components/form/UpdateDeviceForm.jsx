import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import api from "../../config/api";

const UpdateDeviceForm = ({ device, onClose }) => {
  const [title, setTitle] = useState(device.name);
  const [type, setType] = useState(device.type);
  const [status, setStatus] = useState(device.status);
  const [serialNumber, setSerialNumber] = useState(device.serial_number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDevice = {
      device_id: device.device_id,
      name: title,
      type,
      status,
      serial_number: serialNumber,
    };

    try {
       await api.patch(`/product/${device.device_id}`, updatedDevice);
      // console.log("PATCH success:", response);

      toast.success("Thay đổi thông tin thành công", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          onClose();
        },  
      });
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Lỗi không xác định";
        toast.error(message, { position: "top-center", autoClose: 2000 });
      } else {
        toast.error("Lỗi hệ thống", { position: "top-center", autoClose: 2000 });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Cập nhật thiết bị</h2>

        <div>
          <label className="block font-semibold mb-1">Tên thiết bị</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="VD: Màn hình Samsung 24 inch"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Loại thiết bị</label>
          <input
            list="device-types"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="VD: Monitor, Laptop..."
            required
          />
          <datalist id="device-types">
            <option value="Monitor" />
            <option value="Laptop" />
            <option value="Mouse" />
            <option value="Keyboard" />
          </datalist>
        </div>

        <div>
          <label className="block font-semibold mb-1">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Số serial</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="VD: S-MON24-003"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Cập nhật
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
          >
            Hủy
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateDeviceForm;
