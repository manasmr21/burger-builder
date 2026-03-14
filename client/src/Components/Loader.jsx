import React from 'react';

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold text-lg">{message}</p>
        </div>
    );
};

export default Loader;
