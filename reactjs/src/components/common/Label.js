import React from 'react';

const Label = ({ children, className }) => (
  <label className={`block text-sm font-medium mb-1 ${className}`}>{children}</label>
);

export default Label;