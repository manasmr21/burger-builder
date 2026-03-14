import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, PackageSearch } from 'lucide-react';
import useBurgerStore from '../store/burgerStore';
import { apiService } from '../services/apiService';

const Checkout = () => {
  const { slices, quantity, getPriceDetails, resetBurger } = useBurgerStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'success' or 'error'
  
  const details = getPriceDetails();

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setOrderStatus(null);
    try {
      const sliceIds = slices.map(s => s.id);
      
      const response = await apiService.submitOrder(sliceIds, quantity);
      
      if (response.success) {
        setOrderStatus('success');
        resetBurger();
      } else {
        setOrderStatus('error');
      }
    } catch (error) {
      console.error("Order error", error);
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="h-screen w-full bg-yellow-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center max-w-md w-full"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">Order Placed!</h2>
          <p className="text-slate-600 mb-8 text-lg font-medium">Your delicious custom burger is being prepared and will be layered to perfection.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-colors"
          >
            Build Another Burger
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-yellow-50 text-slate-800 font-sans p-6 md:p-12 relative overflow-hidden">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-600 font-bold hover:text-orange-600 transition-colors mb-8 bg-white/50 px-4 py-2 rounded-xl w-fit"
      >
        <ArrowLeft size={20} /> Back to Builder
      </button>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Order Details Column */}
        <div className="flex-1 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <PackageSearch className="text-orange-500" size={28} />
            <h2 className="text-2xl font-black">Your Order</h2>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl mb-6">
            <h3 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Burger Structure ({slices.length} layers)</h3>
            <div className="flex gap-2 flex-wrap text-sm font-medium">
              {slices.map((slice, i) => (
                <span key={i} className={`px-2 py-1 rounded-md text-white ${
                  slice.type === 'bread' ? 'bg-orange-400' :
                  slice.type === 'aloo_tikki' ? 'bg-amber-700' :
                  slice.type === 'paneer' ? 'bg-neutral-400' :
                  slice.type === 'cheese' ? 'bg-yellow-400 text-yellow-900 border border-yellow-500' :
                  slice.type === 'tomato' ? 'bg-red-500' :
                  slice.type === 'onion' ? 'bg-purple-400' :
                  'bg-green-500'
                }`}>
                  {slice.type.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-2xl border border-orange-100 font-black text-xl text-slate-800">
            <span>Quantity</span>
            <span className="text-orange-600">x{quantity}</span>
          </div>
        </div>

        {/* Summary Column */}
        <div className="w-full md:w-[380px] bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-orange-200 h-fit">
          <h3 className="text-xl font-black mb-6 border-b pb-4">Payment Summary</h3>
          
          <div className="space-y-4 text-slate-600 font-medium mb-6 pb-6 border-b">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span>₹{details.basePrice}</span>
            </div>
            
            {details.discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>Cheese + Paneer Combo</span>
                <span>-₹{details.discount}</span>
              </div>
            )}
            
            {details.penalty > 0 && (
              <div className="flex justify-between text-amber-600 text-sm">
                <span>Extra Aloo Tikki Fee</span>
                <span>+₹{details.penalty}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span>Platform Fee</span>
              <span>₹{details.platformFee}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-8">
            <span className="font-bold text-slate-500">Total to Pay</span>
            <span className="text-4xl font-black text-orange-600">₹{details.finalPrice}</span>
          </div>
          
          {orderStatus === 'error' && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center">
              Failed to place order. Is your backend running and connected to MongoDB?
            </div>
          )}

          <button 
            onClick={handlePlaceOrder}
            disabled={isSubmitting || slices.length === 0}
            className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
          >
            {isSubmitting ? 'Processing...' : 'Confirm & Place Order'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
