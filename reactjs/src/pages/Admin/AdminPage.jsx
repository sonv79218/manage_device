import React, { useState, useEffect } from "react";
import api from "../../config/api";
// import Filter from "../components/filter/Filter";
import CardAdmin from "../../components/card/CardAdmin";
import AddNewDeviceForm from "../../components/form/AddNewDeviceForm";
import UpdateDeviceForm from "../../components/form/UpdateDeviceForm";

const AdminPage = () => {
  // ==== Pagination & Filter ====
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [typeOptions, setTypeOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // ==== Devices ====
  const [devices, setDevices] = useState([]);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Lấy danh sách bộ lọc từ backend
  const fetchFilters = async () => {
    try {
      const response = await api.get("/product/filters");
      setTypeOptions(response.data.types || []);
      setStatusOptions(response.data.statuses || []);
    } catch (error) {
      console.error("Lỗi lấy bộ lọc:", error);
    }
  };

  // Lấy danh sách thiết bị
  const fetchDevices = async () => {
    try {
      const params = {};
      if (selectedType) params.type = selectedType;
      if (selectedStatus) params.status = selectedStatus;
      params.page = page;
      params.limit = limit;

      const response = await api.get("/product", { params });
      setDevices(response.data.data || []);
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error("Lỗi lấy thiết bị:", error);
    }
  };

  // Cập nhật số trang khi totalCount thay đổi
  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / limit));
    setPage(1);
  }, [totalCount]);

  // Chạy 1 lần khi load page
  useEffect(() => {
    fetchFilters();
  }, []);

  // Chạy khi filter hoặc page thay đổi
  useEffect(() => {
    fetchDevices();
  }, [selectedType, selectedStatus, page]);

  // ==== Sự kiện ====
  const handleAddSuccess = () => {
    fetchDevices();
  };

  const handleOpen = () => setIsNewItem(true);
  const handleClose = () => setIsNewItem(false);

  const handleEditClick = (device_id) => {
    const found = devices.find((d) => d.device_id === device_id);
    setSelectedDevice(found);
  };

  const handleEditClose = () => {
    setSelectedDevice(null);
    fetchDevices();
  };

  return (
    <>
      {!selectedDevice && (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Trang Quản Trị</h1>
          <h2 className="text-2xl font-bold mb-4">Danh sách thiết bị</h2>
            <button
    onClick={handleOpen}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
  >
    + Thêm mới
  </button>


          <div className="flex gap-4 mb-4">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Tất cả loại</option>
              {typeOptions.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">Tất cả trạng thái</option>
              {statusOptions.map((status, idx) => (
                <option key={idx} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {devices.map((device) => (
              <CardAdmin
                key={device.device_id}
                device_id={device.device_id}
                title={device.name}
                status={device.status}
                type={device.type}
                serial_number={device.serial_number}
                onSuccess={handleAddSuccess}
                onEditClick={() => handleEditClick(device.device_id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang trước
            </button>

            <span>
              Trang {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>



          {isNewItem && <AddNewDeviceForm onClose={handleClose} onSuccess={handleAddSuccess} />}
        </div>
      )}

      {selectedDevice && (
        <UpdateDeviceForm device={selectedDevice} onClose={handleEditClose} />
      )}
    </>
  );
};

export default AdminPage;
