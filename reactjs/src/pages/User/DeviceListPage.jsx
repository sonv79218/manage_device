import React, { useState, useEffect } from 'react';
import Container from '../../components/layout/Container';
import Card from '../../components/card/CardUser';
// import Filter from '../components/filter/Filter';
import DeviceRequestForm from '../../components/form/DeviceRequestForm';
import api from '../../config/api';

const DeviceListPage = () => {
  // phần thêm trang
const [page, setPage] = useState(1);
const limit = 6;
const [totalCount, setTotalCount] = useState(0);
const [totalPages, setTotalPages] = useState(0);

  const [hasRequest, setHasRequest] = useState(false); // thêm công tắc 
  const [devices, setDevices] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);// lưu mảng trả về backend 
  const [statusFilter, setStatusFilter] = useState([]);
  // lưu lựa chọn 
  const [selectedType, setSelectedType] = useState(""); // loại được chọn
  const [selectedStatus, setSelectedStatus] = useState(""); // loại được chọn

  const [actionType, setActionType] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null); // biến xem có sản phẩm nào được chọn không
  const [requestedDeviceIds, setRequestedDeviceIds] = useState([]); // lưu vào mảng các sản phẩm mình đã gửi yêu cầu mượn
  // hàm useEffect sẽ tự động làm khi có thay đổi 
// thực hiện khi đã load hết code rồi 
    // lấy cả các lời yêu cầu của mình để cập nhật nút bấm - 
    const fetchBorrowRequests = async () => {
    const res = await api.get('/borrow-request/me');
    const deviceIds = res.data.map(r => r.product.device_id); 
    // console.log('🟢 Các device_id đã mượn:', deviceIds);
    setRequestedDeviceIds(deviceIds); // lưu vào mảng deviceIds
  };
      // lấy tất cả sản phẩm
    const fetchDevices = async () => {
      // khai báo đối tượng param
      const params = {};
        if (selectedType) params.type = selectedType;
        if (selectedStatus) params.status = selectedStatus;
        params.page = page; // truyền vào trang mặc định - đầu tiên là page = 1 sau page sẽ thay đổi 
        params.limit = limit; // truyền vào limit 
      const response = await api.get('/product', { params });
      setDevices(response.data.data); 
      setTotalCount(response.data.totalCount); // tổng số sản phẩm trả về 
      // console.log(response.data);
    };
// hàm có chức năng gọi 1 lần để lấy dữ liệu 
  useEffect(() => {
      const fetchFilter = async () => {
      // khai báo đối tượng param
      const response = await api.get('/product/filters');
      setTypeFilter(response.data.types);
      setStatusFilter(response.data.statuses);
      // console.log(response.data.types);
      // console.log(typeFilter);
    };
    fetchFilter();
    // fetchDevices();
    // fetchBorrowRequests();
  },[]);// gọi lại khi có page thay đổi
  // gọi useEffect khi có thay đổi
  // console.log("typeFilter đã cập nhật:", typeFilter);
    // Theo dõi khi state thay đổi (debug)
  useEffect(() => {
  fetchDevices(); // nếu mà fetch xong thì số lượng trang cũng phải thay đổi 
}, [selectedType,selectedStatus,page]); // nếu mà chọn loại thì danh sách trả về thay đổi: dữ liệu, số lượng trang 
  useEffect(() => {
  fetchBorrowRequests(); // nếu mà fetch xong thì số lượng trang cũng phải thay đổi 
}, []); 
// const uniqueTypes = Array.from(new Set(devices.map((device) => device.type)));
// const uniqueStatus = Array.from(new Set(devices.map((device) => device.status)));

  // const filteredDevices = devices.filter( 
  //   (device) =>
  //     (!typeFilter || device.type === typeFilter) && // lọc theo loại - nếu có 
  //     (!statusFilter || device.status === statusFilter) // lọc theo trạng thái - nếu có
  // );

  const handleRequest = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setActionType('borrow'); // set biến type bằng borrow
  };

  const handleCloseForm = () => {
    setSelectedDeviceId(null);
  };
  
const handleAfterRequest = () => {
  // setHasRequest(true);
  fetchBorrowRequests();

};
// phần totalPage này phải thay đổi khi totalCount thay đổi
useEffect(()=>{const totalPages = Math.ceil(totalCount / limit);
  setTotalPages(totalPages);
  setPage(1);
},[totalCount])

// useEffect(()=>{console.log(devices)
// console.log('số sản phẩm lấy về',totalCount)},[devices, totalCount])


// console.log('số trang ',totalPages);
  // Mỗi khi người dùng chọn loại mới
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
    // Theo dõi giá trị được chọn (debug)
  // useEffect(() => {
  //   console.log("Loại được chọn:", selectedType);
  //   // Ở đây bạn có thể gọi API lọc sản phẩm theo loại
  // }, [selectedType,selectedStatus]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách thiết bị</h2>
      {/* <Filter 
      statusOptions={statusFilter}
      typeOptions={typeFilter}
      onTypeChange={(e) => setTypeFilter(e.target.value)} 
      onStatusChange={(e) => setStatusFilter(e.target.value)} /> */}
            {/* Lọc theo loại */}
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Tất cả loại</option>
        {typeFilter.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
            <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="">Tất cả trạng thái</option>
        {statusFilter.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

        {/* map devices */}
        {/* truyền dữ liệu vào từng device */}
        {
          devices.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-8">
      Không có dữ liệu
    </div>
  ) : (
        
        devices.map((device) => (
          <Card
          // lưu deviceid vào key
            key={device.device_id}
            // tên
            title={device.name}
            // trạng thái
            status={device.status}
            // truyền thêm 
            type={device.type}

            serial_number={device.serial_number}
            //  mượn thiết bị 
            onRequest={() => handleRequest(device.device_id)} 
            //  cập nhật 2 biến mở popup 
            // trả thiết bị ??
            // onReturn={() => handleReturn(device.device_id)}
            hasRequested={requestedDeviceIds.includes(device.device_id)} // ✅ thêm dòng này
            //requestdeviceId bao gồm device.device_id thì trả về true không thì là fail
          
          >
          </Card>

        )))}
      </div>


<div className="flex justify-between mt-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Trang trước
  </button>

  <span>Trang {page} / {totalPages}</span>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page >= totalPages}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Trang sau
  </button>
</div>

      
      {/*  nếu tồn tại  */}
      {/*  vấn đề là cả return và request đều cần phải lưu id vào state -> lưu cả id và lưu cả mode vào state*/} 
      {/* {selectedDeviceId && <DeviceRequestForm deviceId={selectedDeviceId} onClose={handleCloseForm} />} */}
 {/* điều khiển popup  */}
    {selectedDeviceId && actionType === 'borrow' && ( // khi mà 1 sản phẩm được chọn và theo kiểu borrow thì sẽ hiện ra form 
    <DeviceRequestForm deviceId={selectedDeviceId} onClose={handleCloseForm} onSuccess={handleAfterRequest}  /> 
)}
    </div>
  );
};

export default DeviceListPage;
