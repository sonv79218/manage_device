
import { Routes, Route,Outlet } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyDevicesPage from '../pages/User/MyDevices/MyDevicesPage';
import DeviceListPage from '../pages/User/DeviceListPage';
import PrivateUserRoute from './PrivateUserRoute';
import PrivateAdminRoute from './PrivateAdminRoute';
import AdminPage from '../pages/Admin/AdminPage';
import Unauthorized from '../pages/Unauthorized';
import BorrowRequestsAdmin from '../pages/Admin/BorrowRequestAdmin';
import ProfilePage from '../pages/User/Profile';
import AdminUserManagement from '../pages/Admin/AdminUserManagement';
import MyRequestedPage from '../pages/User/MyDevices/MyRequestedPage';
import ReturnedPage from '../pages/User/MyDevices/ReturnedPage';
import MyRejected from '../pages/User/MyDevices/RejectPage';
import DashboardPage from '../pages/Admin/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import DeviceNavbar from '../components/layout/DeviceNavbar';
import AdminNavbar from '../components/layout/AdminNavbar';
import FullNavbar from '../components/layout/FullNavbar';
import AdminUserDetail from '../pages/Admin/AdminUserDetail';
import AdminDeviceDetail from '../pages/Admin/AdminDeviceDetail';


const AppRoutes = () => (

  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path={"/login"} element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    {/*  trong devices sẽ có các phần con - static nested routes */}
    <Route path="user"   
          element={ <PrivateUserRoute>  <FullNavbar/> </PrivateUserRoute>  }>
          <Route index element={<DeviceListPage />} />
           {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />

          <Route path="devices" element={ <DeviceNavbar /> }>
              {/* Route mặc định khi vào /devices */}
              <Route index element={<MyDevicesPage />} />
              <Route path="requested" element={<MyRequestedPage />} />
              <Route path="returned" element={<ReturnedPage />} />
              <Route path="rejected" element={<MyRejected />} />
          </Route >
    </Route>

    <Route
      path="/admin"
      element={
        <PrivateAdminRoute>
          <AdminNavbar/>
        </PrivateAdminRoute>
      }
    >
      {/* Route mặc định khi vào /devices */}
      <Route index element={<AdminPage/>} />
      <Route path="user" element={<AdminUserManagement  />} />
      <Route path="user/:userId" element={<AdminUserDetail />} />
      <Route path="device/:deviceId" element={<AdminDeviceDetail />} />
      <Route path="borrow_request" element={<BorrowRequestsAdmin />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Route >
 
  </Routes>
);

export default AppRoutes;