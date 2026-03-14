import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import useBurgerStore from '../store/burgerStore.js';

const sliceStyles = {
  bread_top: "bg-gradient-to-b from-orange-400 to-orange-300 h-24 rounded-t-[120px] rounded-b-xl shadow-[inset_0_-4px_rgba(0,0,0,0.1)] border-b-2 border-orange-600/20 z-[20]",
  bread_bottom: "bg-gradient-to-b from-orange-300 to-orange-400 h-16 rounded-b-[40px] rounded-t-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] z-[1]",
  aloo_tikki: "bg-amber-700 h-12 rounded-[20px] shadow-sm border border-amber-900/40 relative overflow-hidden",
  paneer: "bg-neutral-100 h-8 rounded-lg shadow-sm border border-neutral-300",
  cheese: "bg-yellow-400 h-5 rounded-md shadow-sm border border-yellow-500 scale-105",
  tomato: "bg-red-500 h-6 rounded-full shadow-sm border border-red-600",
  onion: "bg-purple-200 h-4 rounded-full shadow-sm border border-purple-300",
  lettuce: "bg-green-500 h-6 rounded-xl shadow-sm border border-green-600 transform -skew-x-3 scale-110",
};

const Slice = ({ type, isTop, isBottom, id }) => {
  const { removeSlice } = useBurgerStore();
  let styleKey = type;
  if (type === 'bread') {
    styleKey = isTop ? 'bread_top' : 'bread_bottom';
  }

  const isRemovable = type !== 'bread';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, x: 100 }}
      className={`w-full max-w-[280px] mx-auto group relative flex items-center justify-center transition-all hover:brightness-105 ${isRemovable ? 'cursor-grab active:cursor-grabbing' : ''} ${sliceStyles[styleKey]}`}
    >
      {isRemovable && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            removeSlice(id);
          }}
          className="absolute right-[-20px] md:right-[-40px] bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-[100] hover:bg-red-600 shadow-lg scale-75 md:scale-100"
        >
          <X size={16} />
        </button>
      )}
      
      {/* Decorative details */}
      {type === 'aloo_tikki' && (
         <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 to-transparent"></div>
      )}
      {styleKey === 'bread_top' && (
        <div className="absolute top-4 w-12 h-2 flex gap-4 opacity-40">
            <div className="w-2 h-1 bg-white rounded-full mt-2"></div>
            <div className="w-2 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white rounded-full mt-1"></div>
        </div>
      )}
    </motion.div>
  );
};

export default Slice;
