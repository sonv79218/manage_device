import React from 'react';

const Container = ({ children, className }) => (
  <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${className}`}>
    {children}
  </div>
);

export default Container;