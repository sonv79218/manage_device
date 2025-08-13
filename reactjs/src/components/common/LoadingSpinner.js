import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <motion.div
    className="inline-block w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

export default LoadingSpinner;