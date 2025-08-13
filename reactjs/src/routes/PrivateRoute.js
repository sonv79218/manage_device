import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  const location = useLocation();
// nếu không có token thì sang login 
// console.log(user.role);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default PrivateRoute;