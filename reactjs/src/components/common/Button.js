import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', className, disabled = false }) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
  >
    {children}
  </motion.button>
);

export default Button;