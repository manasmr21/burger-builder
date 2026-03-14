import React from 'react';
import useBurgerStore from '../store/burgerStore.js';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const PriceSummary = () => {
  const { getPriceDetails, quantity, setQuantity } = useBurgerStore();
  const navigate = useNavigate();

  const details = getPriceDetails();

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100 mt-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-10 opacity-50"></div>
      
      <h3 className="text-xl font-black text-slate-800 mb-6">Order Summary</h3>
      
      {details.isOversized && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium animate-pulse flex items-center gap-2">
          <span className="text-xl">👨‍🍳</span>
          <p>Chef suggests splitting this burger into two burgers.</p>
        </div>
      )}

      <div className="space-y-3 text-sm text-slate-600 mb-6 pb-6 border-b border-slate-100">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span className="font-semibold text-slate-800">₹{details.basePrice}</span>
        </div>
        
        {details.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium bg-green-50 p-2 rounded-lg -mx-2">
            <span>Cheese + Paneer Combo</span>
            <span>-₹{details.discount}</span>
          </div>
        )}

        {details.penalty > 0 && (
          <div className="flex justify-between text-amber-600 font-medium bg-amber-50 p-2 rounded-lg -mx-2">
            <span>Extra Aloo Tikki Layer Fee</span>
            <span>+₹{details.penalty}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="font-semibold text-slate-800">₹{details.platformFee}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 bg-slate-50 p-3 rounded-2xl">
        <span className="text-slate-600 font-medium">Quantity</span>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm disabled:opacity-50 text-orange-500 font-black hover:bg-orange-50 transition-colors"
          >-</button>
          <span className="w-8 text-center font-black text-lg text-slate-800">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm text-orange-500 font-black hover:bg-orange-50 transition-colors"
          >+</button>
        </div>
      </div>

      <div className="flex items-end justify-between mb-6">
        <span className="text-lg font-bold text-slate-600">Total Price</span>
        <span className="text-4xl font-black text-orange-600">₹{details.finalPrice}</span>
      </div>

      <button 
        onClick={() => navigate('/checkout')}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_16px_rgba(249,115,22,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
      >
        <ShoppingCart size={20} className="group-hover:-rotate-12 transition-transform" />
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PriceSummary;
