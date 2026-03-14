import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 border border-slate-200 animate-slide-up relative">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                >
                    ✕
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                        ⚠️
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">{title}</h2>
                </div>
                
                <p className="text-slate-600 font-medium mb-8 text-base">{message}</p>
                
                <div className="flex justify-end gap-3 font-bold">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Keep Order
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-5 py-2.5 rounded-xl text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/30 transition-colors cursor-pointer"
                    >
                        Yes, Cancel Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
