import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBurgerStore from '../store/burgerStore';
import CheckoutLoader from '../Components/CheckoutLoader';
import { apiService } from '../services/apiService';
import { calculatePrice } from '../utils/priceCalculator';

const CartPage = () => {
    const navigate = useNavigate();
    const { slices, quantity, emptySlices, setQuantity, customerDetails, clearCustomerDetails } = useBurgerStore();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => {
        if (!slices.length) return;
        if (!customerDetails?.name?.trim() || !customerDetails?.address?.trim()) {
            useBurgerStore.getState().showAlert('Please enter your details first.', 'error');
            navigate('/checkout');
        }
    }, [customerDetails, navigate, slices.length]);

    if (slices.length === 0 && !isPlacingOrder) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
                <h1 className="text-3xl font-black text-slate-800 mb-4">Your Burger is Empty</h1>
                <button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md">
                    Build a Burger
                </button>
            </div>
        );
    }

    const previewMapped = slices.map(item => ({ type: item.type }));
    const priceDetails = calculatePrice(previewMapped, quantity);

    const handleProceedToPay = async () => {
        setIsPlacingOrder(true);
        try {
            const orderSlices = slices.map(item => ({
                id: item.id,
                type: item.type,
                name: item.name,
                price: item.price
            }));

            const response = await apiService.submitOrder(orderSlices, quantity, 'Placed', customerDetails);

            if (response.success) {
                setTimeout(() => {
                    emptySlices();
                    setQuantity(1);
                    clearCustomerDetails();
                    setIsPlacingOrder(false);
                    useBurgerStore.getState().showAlert("Order Placed Successfully!", 'success');
                    navigate('/');
                }, 800);
            } else {
                setIsPlacingOrder(false);
                useBurgerStore.getState().showAlert("Failed to place order.", 'error');
            }
        } catch (error) {
            setIsPlacingOrder(false);
            console.error("Order error:", error);
            useBurgerStore.getState().showAlert("Something went wrong while placing order.", 'error');
        }
    };

    console.log(slices)

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-6 px-4 sm:px-6 lg:px-8">
            {isPlacingOrder && <CheckoutLoader message="Processing payment..." />}

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-lg p-5 border border-slate-200">
                    <h2 className="text-lg font-black text-slate-800 border-b pb-2.5 mb-3">Cart</h2>

                    <div className="mb-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Address</p>
                        <div className="text-sm font-medium text-slate-700">
                            <div>
                                Delivering to{' '}
                                <span className="font-black text-slate-900">
                                    {customerDetails?.name?.trim() ? customerDetails.name : 'your name'}
                                </span>
                            </div>
                            <div className="font-black text-slate-900">
                                {customerDetails?.address?.trim() ? customerDetails.address : 'your address'}
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Burger Configuration</p>
                        <div className="flex flex-col items-center gap-2 text-xs font-bold">
                            <div className="w-full max-w-[220px] h-4.5 rounded-t-full bg-amber-400 border border-amber-500 shadow-inner flex items-center justify-center text-amber-900/80">
                                Bun
                            </div>
                            {slices.map((slice, i) => (
                                <div
                                    key={i}
                                    className={`w-full max-w-[220px] px-3 py-1 rounded-md text-white flex justify-between items-center ${slice.color || 'bg-slate-500'}`}
                                >
                                    <span>{slice.name}</span>
                                    <span>₹{slice.price}</span>
                                </div>
                            ))}
                            <div className="w-full max-w-[220px] h-3.5 rounded-b-full bg-amber-400 border border-amber-500 shadow-inner flex items-center justify-center text-amber-900/80">
                                Bun
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                        <div className="space-y-2 text-sm font-bold text-slate-600">
                            <div className="flex justify-between border-b border-orange-200/50 pb-2">
                                <span>Base Price ({slices.length} items) x {quantity}</span>
                                <span>₹{priceDetails.basePrice}</span>
                            </div>

                            {priceDetails.discount > 0 && (
                                <div className="flex justify-between text-green-600 border-b border-orange-200/50 pb-2">
                                    <span>Cheese + Paneer Combo</span>
                                    <span>-₹{priceDetails.discount}</span>
                                </div>
                            )}

                            {priceDetails.penalty > 0 && (
                                <div className="flex justify-between text-amber-600 border-b border-orange-200/50 pb-2">
                                    <span>Extra Aloo Tikki Fee</span>
                                    <span>+₹{priceDetails.penalty}</span>
                                </div>
                            )}

                            <div className="flex justify-between border-b border-orange-200/50 pb-2">
                                <span>Platform Fee</span>
                                <span>₹{priceDetails.platformFee}</span>
                            </div>

                            <div className="flex justify-between pt-2 text-base font-black text-slate-800">
                                <span>Total to Pay</span>
                                <span className="text-orange-600">₹{priceDetails.finalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleProceedToPay}
                        className="w-full mt-3 bg-slate-900 hover:bg-black text-white font-black py-2.5 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                        disabled={!slices.length}
                    >
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
