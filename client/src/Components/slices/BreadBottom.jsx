import React from 'react';
import { motion } from 'framer-motion';

const BreadBottom = ({ className = "", style = {} }) => {
    return (
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`relative w-4/5 h-20 md:h-24 bg-orange-400 rounded-b-[40px] shadow-inner drop-shadow-xl mx-auto border-t-2 border-orange-500 ${className}`}
            style={{ backgroundImage: 'linear-gradient(to top, #ed8936, #f6ad55)', ...style }}
        >
        </motion.div>
    );
}

export default BreadBottom;
