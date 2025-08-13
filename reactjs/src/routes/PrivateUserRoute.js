import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useLocation } from 'react-router-dom';


const PrivateUserRoute = ({ children }) => {
  const { token, user } = useAuth();
  const location = useLocation();
// nếu không có token thì sang login 
// console.log(user.role);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // nếu mà user.token = user thì mới có quyền vào
  if(user.role!=='user'){
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
    else
  return children;
};



export default PrivateUserRoute;