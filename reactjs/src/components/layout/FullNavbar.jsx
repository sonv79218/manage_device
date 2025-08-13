import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FullNavbar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-gray-600 font-bold border-b-2 border-gray-600 pb-1'
      : 'text-gray-600 hover:text-gray-500';

  return (
    <div>
      {/* Thanh điều hướng */}
      <nav className="p-4 shadow-md flex justify-between items-center bg-white">
        <h1 className="text-lg font-bold">
          <NavLink to="" >
            Thiết bị App
          </NavLink>
        </h1>
        <div className="space-x-4">
          <NavLink to="" end className={linkClass}>Trang chủ</NavLink>
          <NavLink to="devices" className={linkClass}>Thiết bị</NavLink>
          <NavLink to="profile" className={linkClass}>Trang Cá nhân</NavLink>
          <button
            onClick={logout}
            className="text-red-500 hover:underline"
          >
            Đăng xuất
          </button>
        </div>
      </nav>

      {/* Nội dung bên dưới */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default FullNavbar;
