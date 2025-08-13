import { NavLink, Outlet } from "react-router-dom";

const DeviceNavbar = () => {
  return (
    <div>
      <nav className="p-2 border-b flex gap-4">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? " text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-gray-600"
          }
        >
          Được chấp nhận
        </NavLink>

        <NavLink
          to="requested"
          className={({ isActive }) =>
            isActive
              ? " text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-gray-600"
          }
        >
          Yêu cầu của tôi
        </NavLink>

        <NavLink
          to="returned"
          className={({ isActive }) =>
            isActive
              ? " text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-gray-600"
          }
        >
          Đã sử dụng
        </NavLink>

        <NavLink
          to="rejected"
          className={({ isActive }) =>
            isActive
              ? " text-gray-600 border-b-2 border-gray-600"
              : "text-gray-600 hover:text-gray-600"
          }
        >
          Bị từ chối
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default DeviceNavbar;
