import React from 'react';

const CheckoutLoader = ({ message = "Processing your order..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm p-4">
            <div className="relative w-24 h-24">
                {/* Outer spinning ring */}
                <div className="w-24 h-24 border-8 border-orange-100 border-t-orange-500 rounded-full animate-spin absolute inset-0"></div>
                {/* Inner pulsing burger icon or emoji */}
                <div className="w-24 h-24 flex items-center justify-center text-4xl animate-pulse absolute inset-0">
                    🍔
                </div>
            </div>
            <h2 className="mt-8 text-2xl font-black text-slate-800 animate-pulse text-center">{message}</h2>
            <p className="mt-2 text-slate-500 font-medium">Please don't close this window</p>
        </div>
    );
};

export default CheckoutLoader;
