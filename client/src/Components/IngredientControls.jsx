import React from 'react';
import useBurgerStore from '../store/burgerStore.js';
import { INGREDIENT_PRICES } from '../utils/priceCalculator.js';
import { Plus } from 'lucide-react';

const ingredients = [
  { type: 'aloo_tikki', label: 'Aloo Tikki', color: 'bg-amber-700' },
  { type: 'paneer', label: 'Paneer', color: 'bg-neutral-100 text-neutral-800' },
  { type: 'cheese', label: 'Cheese', color: 'bg-yellow-400 text-yellow-900 border border-yellow-500' },
  { type: 'tomato', label: 'Tomato', color: 'bg-red-500' },
  { type: 'onion', label: 'Onion', color: 'bg-purple-200 text-purple-900' },
  { type: 'lettuce', label: 'Lettuce', color: 'bg-green-500' },
];

const IngredientControls = () => {
  const { addSlice, slices } = useBurgerStore();
  const isFull = slices.length >= 10;

  return (
    <div className="w-full max-w-sm mx-auto p-5 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100">
      <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-800">Add Ingredients</h3>
          {isFull && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">Max Reached</span>}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {ingredients.map((ing) => (
          <button
            key={ing.type}
            onClick={() => addSlice(ing.type)}
            disabled={isFull}
            className={`flex items-center justify-between p-3 rounded-2xl transition-all shadow-sm
              ${ing.color} text-white font-semibold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed`}
          >
            <span>{ing.label}</span>
            <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg text-xs font-bold">
              <span>₹{INGREDIENT_PRICES[ing.type]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IngredientControls;
