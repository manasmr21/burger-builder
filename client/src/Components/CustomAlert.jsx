import React, { useEffect } from 'react';

const CustomAlert = ({ isOpen, message, type = 'success', onClose }) => {
    if (!isOpen) return null;

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    const colors = {
        success: 'bg-green-100 text-green-800 border-green-200 shadow-green-100/50',
        error: 'bg-red-100 text-red-800 border-red-200 shadow-red-100/50',
        warning: 'bg-amber-100 text-amber-800 border-amber-200 shadow-amber-100/50',
    };

    const icons = {
        success: '🎉',
        error: '❌',
        warning: '⚠️',
    };

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex justify-center animate-slide-down">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-xl backdrop-blur-md ${colors[type]}`}>
                <span className="text-2xl">{icons[type]}</span>
                <p className="font-bold text-lg pr-4">{message}</p>
                <button 
                    onClick={onClose}
                    className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
