import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Popup state: loại popup (product/request), filter key và giá trị
  const [popupData, setPopupData] = useState({ type: null, filterKey: null, filterValue: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      axios.get("http://localhost:5000/product", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("http://localhost:5000/borrow-request", { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([resProducts, resRequests]) => {
        setProducts(resProducts.data.data || []);
        setBorrowRequests(resRequests.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  // Thống kê sản phẩm
  const countProductsByType = products.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  const countProductsByStatus = products.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  // Thống kê requests
  const countRequestsByStatus = borrowRequests.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  // Dữ liệu biểu đồ request
  const pieRequestsData = {
    labels: Object.keys(countRequestsByStatus),
    datasets: [{
      data: Object.values(countRequestsByStatus),
      backgroundColor: ["#facc15", "#22c55e", "#3b82f6", "#ef4444"],
    }],
  };
  const barRequestsData = {
    labels: Object.keys(countRequestsByStatus),
    datasets: [{
      label: "Số lượng requests",
      data: Object.values(countRequestsByStatus),
      backgroundColor: ["#facc15", "#22c55e", "#3b82f6", "#ef4444"],
    }],
  };

  // Hàm mở popup
  const openPopup = (type, filterKey, filterValue) => {
    setPopupData({ type, filterKey, filterValue });
  };
  // Đóng popup
  const closePopup = () => setPopupData({ type: null, filterKey: null, filterValue: null });

  // Lọc dữ liệu popup
  let popupList = [];
  if (popupData.type === "product") {
    popupList = products.filter(p => p[popupData.filterKey] === popupData.filterValue);
  } else if (popupData.type === "request") {
    popupList = borrowRequests.filter(r => r[popupData.filterKey] === popupData.filterValue);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard Thống kê</h2>

      {/* ==== Cards Products ==== */}
      <div style={{ margin: "20px 0" }}>
        <h3>📦 Thống kê thiết bị</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "10px" }}>
          <Card title="Tổng thiết bị" value={products.length} />

          {/* Theo loại */}
          {/* {Object.entries(countProductsByType).map(([type, count]) => (
            <Card
              key={type}
              title={`Loại: ${type}`}
              value={count}
              onClick={() => openPopup("product", "type", type)}
            />
          ))} */}

          {/* Theo trạng thái */}
          {Object.entries(countProductsByStatus).map(([status, count]) => (
            <Card
              key={status}
              title={`Trạng thái: ${status}`}
              value={count}
              onClick={() => openPopup("product", "status", status)}
            />
          ))}
        </div>
      </div>

      {/* ==== Cards Requests ==== */}
      <div style={{ margin: "20px 0" }}>
        <h3>📦 Thống kê yêu cầu</h3>
        <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
          <Card
            title="Tổng requests"
            value={borrowRequests.length}
            // onClick={() => openPopup("request", null, null)}
          />
          {Object.entries(countRequestsByStatus).map(([status, count]) => (
            <Card
              key={status}
              title={status}
              value={count}
              onClick={() => openPopup("request", "status", status)}
            />
          ))}
        </div>
      </div>

      {/* ==== Charts Requests ==== */}
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ flex: 1 }}>
          <h3>📄 Biểu đồ tròn - Trạng thái request</h3>
          <Pie data={pieRequestsData} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>📄 Biểu đồ cột - Request theo trạng thái</h3>
          <Bar data={barRequestsData} />
        </div>
      </div>

      {/* ==== Popup danh sách chi tiết ==== */}
      {popupData.type && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            maxHeight: "80vh",
            overflowY: "auto",
            width: "90%",
            maxWidth: 800,
          }}>
            <button
              onClick={closePopup}
              style={{ float: "right", cursor: "pointer", fontSize: 18 }}
            >
              ✖
            </button>
            <h3>Danh sách {popupData.type === "product" ? "thiết bị" : "yêu cầu"}</h3>
            <p><b>Lọc theo:</b> {popupData.filterKey ? `${popupData.filterKey} = ${popupData.filterValue}` : "Tất cả"}</p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ccc" }}>
                  {popupData.type === "product" ? (
                    <>
                      {/* <th>ID</th> */}
                      <th>Tên</th>
                      <th>Loại</th>
                      <th>Thương hiệu</th>
                      <th>Trạng thái</th>
                      <th>Số seri</th>
                    </>
                  ) : (
                    <>
                      {/* <th>ID</th> */}
                      <th>Người dùng</th>
                      <th>Thiết bị</th>
                      <th>Trạng thái</th>
                      <th>Ngày trả dự kiến</th>
                      <th>Ghi chú</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {popupList.length === 0 && (
                  <tr><td colSpan={popupData.type === "product" ? 6 : 6} style={{ textAlign: "center" }}>Không có dữ liệu</td></tr>
                )}
                {popupList.map(item => (
                  <tr key={item.device_id || item.id} style={{ borderBottom: "1px solid #eee" }}>
                    {popupData.type === "product" ? (
                      <>
                        {/* <td>{item.device_id}</td> */}
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.brand}</td>
                        <td>{item.status}</td>
                        <td>{item.serial_number}</td>
                      </>
                    ) : (
                      <>
                        {/* <td>{item.id}</td> */}
                        <td>{item.user?.name || "N/A"}</td>
                        <td>{item.product?.name || "N/A"}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.expectedReturnDate).toLocaleDateString()}</td>
                        <td>{item.note}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value, onClick }) => (
  <div
    style={{
      background: "#f3f4f6",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      flex: 1,
      cursor: onClick ? "pointer" : "default",
      userSelect: "none",
    }}
    onClick={onClick}
  >
    <h4>{title}</h4>
    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default DashboardPage;
