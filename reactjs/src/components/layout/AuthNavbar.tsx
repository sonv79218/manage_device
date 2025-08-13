import { Link } from 'react-router-dom';

const AuthNavbar = () => {
  return (
    <nav className="p-4 shadow-md flex justify-between">
      <h1 className="text-lg font-bold">Thiết bị App</h1>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-500">Đăng nhập</Link>
        <Link to="/register" className="text-blue-500">Đăng ký</Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
