import React from 'react';
import useBurgerStore from '../store/burgerStore.js';
import { INGREDIENT_PRICES } from '../utils/priceCalculator.js';
import { Plus } from 'lucide-react';

import { useEffect } from 'react';

const IngredientControls = () => {
  const { addSlice, slices, availableIngredients, fetchIngredients, isLoadingIngredients } = useBurgerStore();
  const isFull = slices.length >= 10;

  useEffect(() => {
    if (availableIngredients.length === 0) {
      fetchIngredients();
    }
  }, [fetchIngredients, availableIngredients.length]);

  const getColor = (type) => {
    switch (type.toLowerCase()) {
      case 'aloo tikki': return 'bg-amber-700';
      case 'paneer': return 'bg-slate-200 text-slate-800 border border-slate-300';
      case 'cheese': return 'bg-yellow-400 text-yellow-900 border border-yellow-500';
      case 'tomato': return 'bg-red-500';
      case 'onion': return 'bg-purple-200 text-purple-900';
      case 'lettuce': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-5 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100">
      <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-800">Add Ingredients</h3>
          {isFull && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">Max Reached</span>}
      </div>
      
      {isLoadingIngredients ? (
        <div className="py-4 text-center text-slate-500 font-medium">Loading ingredients...</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {availableIngredients.map((ing) => (
            <button
              key={ing.id}
              onClick={() => addSlice(ing)}
              disabled={isFull}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all shadow-sm
                ${getColor(ing.name)} text-white font-semibold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed`}
            >
              <span>{ing.name}</span>
              <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg text-xs font-bold">
                <span>₹{ing.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientControls;
