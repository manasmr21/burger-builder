import React from 'react';
import { motion } from 'framer-motion';

const BreadTop = () => {
    return (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-4/5 h-32 md:h-40 bg-orange-400 rounded-t-[100px] shadow-inner drop-shadow-xl mt-4 mx-auto overflow-hidden border-b-2 border-orange-500"
            style={{ backgroundImage: 'linear-gradient(to bottom, #f6ad55, #ed8936)' }}
        >
            {/* Seeds */}
            <div className="absolute top-1/4 left-1/4 w-3 h-1.5 bg-yellow-100 rounded-full rotate-15 shadow-sm"></div>
            <div className="absolute top-1/3 left-1/2 w-3.5 h-1.5 bg-yellow-100 rounded-full rotate-[-10deg] shadow-sm"></div>
            <div className="absolute top-1/2 left-3/4 w-3 h-1.5 bg-yellow-100 rounded-full rotate-25 shadow-sm"></div>
            <div className="absolute top-1/2 left-1/5 w-2.5 h-1 bg-yellow-100 rounded-full rotate-[-25deg] shadow-sm"></div>
            <div className="absolute top-2/3 left-1/3 w-3.5 h-1.5 bg-yellow-100 rounded-full rotate-[5deg] shadow-sm"></div>
            <div className="absolute top-2/3 left-2/3 w-3 h-1.5 bg-yellow-100 rounded-full rotate-[-15deg] shadow-sm"></div>
        </motion.div>
    );
}

export default BreadTop;
