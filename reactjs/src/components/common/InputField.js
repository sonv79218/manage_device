import React from 'react';

const InputField = ({ type, value, onChange, placeholder, className, disabled = false, error = false }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
    placeholder={placeholder}
    disabled={disabled}
    required
  />
);

export default InputField;