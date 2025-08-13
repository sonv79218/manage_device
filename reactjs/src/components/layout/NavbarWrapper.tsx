import React from 'react';
import { useLocation } from 'react-router-dom';
import FullNavbar from './FullNavbar.tsx'; // Navbar sau khi đăng nhập
import AuthNavbar from './AuthNavbar.tsx'; // Navbar chỉ có nút Đăng nhập / Đăng ký
import { useAuth } from '../../context/AuthContext.js';
import AdminNavbar from './AdminNavbar.jsx';

const NavbarWrapper = () => {
 const { user } = useAuth();
//  console.log(user?.role);
  const location = useLocation();

  // Danh sách các trang thuộc phần auth
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  // nếu mà là user thì navbar là được sử dụng những trang user
  // nếu mà là admin thì navbar là được sử dụng những tra
  const noNavBar = location.pathname === '/unauthorized';
  if (isAuthPage) {
    return <AuthNavbar />; 
  }
  if(noNavBar){
    return ;
  }
  // if(user?.role === 'admin')
  // return <AdminNavbar/>;
  // if(user?.role === 'user')
  // return <FullNavbar/>
};

export default NavbarWrapper;
