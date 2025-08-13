import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import NavbarWrapper from './components/layout/NavbarWrapper.tsx'; // Tạo mới component này
import './index.css';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <NavbarWrapper />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
