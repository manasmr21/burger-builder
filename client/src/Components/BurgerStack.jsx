import React from 'react';

const toTypeKey = (name) => name.toLowerCase().replace(/\s+/g, '_');

const SLICE_COLORS = {
    aloo_tikki: 'bg-amber-700',
    paneer: 'bg-neutral-400',
    cheese: 'bg-yellow-400',
    tomato: 'bg-red-500',
    onion: 'bg-purple-400',
    lettuce: 'bg-green-500'
};

const BurgerStack = ({ slices = [], maxWidthClass = 'max-w-[220px]' }) => {
    const getSliceColor = (slice) => {
        const key = slice.type || toTypeKey(slice.name || '');
        return slice.color || SLICE_COLORS[key] || 'bg-slate-500';
    };

    return (
        <div className="flex flex-col items-center gap-2 text-xs font-bold">
            <div className={`w-full ${maxWidthClass} h-4.5 rounded-t-full bg-amber-400 border border-amber-500 shadow-inner flex items-center justify-center text-amber-900/80`}>
                Bun
            </div>
            {slices.map((slice, idx) => (
                <div
                    key={slice.ingredientId ?? slice.id ?? idx}
                    className={`w-full ${maxWidthClass} px-3 py-1 rounded-md text-white flex justify-between items-center ${getSliceColor(slice)}`}
                >
                    <span>{slice.name}</span>
                    <span>₹{slice.price}</span>
                </div>
            ))}
            <div className={`w-full ${maxWidthClass} h-3.5 rounded-b-full bg-amber-400 border border-amber-500 shadow-inner flex items-center justify-center text-amber-900/80`}>
                Bun
            </div>
        </div>
    );
};

export default BurgerStack;
