import { NavLink, Outlet,Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-gray-600 font-bold border-b-2 border-gray-600 pb-1'
      : 'text-gray-600 hover:text-gray-500';

  return (
    <div>
      <nav className="p-4 shadow-md flex justify-between items-center">
           <h1 className="text-lg font-bold">
          <Link to="" end >
            Thiết bị App
          </Link>
        </h1>
        <div className="space-x-4">
          <NavLink to="" end className={linkClass}>
            Trang chủ admin
          </NavLink>
          <NavLink to="borrow_request" className={linkClass}>
            Yêu cầu
          </NavLink>
          <NavLink to="user" className={linkClass}>
            Quản lý tài khoản
          </NavLink>
          <NavLink to="dashboard" className={linkClass}>
            Thống kê
          </NavLink>
          <button
            onClick={logout}
            className="text-red-500 hover:underline"
          >
            Đăng xuất
          </button>
        </div>
      </nav>

      {/* Render trang con */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNavbar;
