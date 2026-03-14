import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBurgerStore from '../store/burgerStore';
import CheckoutLoader from '../Components/CheckoutLoader';
import { apiService } from '../services/apiService';
import { calculatePrice } from '../utils/priceCalculator';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { slices, quantity, emptySlices, setQuantity } = useBurgerStore();

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'UPI'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (slices.length === 0) {
            useBurgerStore.getState().showAlert('Your burger has no slices!', 'error');
            navigate('/');
            return;
        }

        setIsPlacingOrder(true);

        try {
            const orderSlices = slices.map(item => ({
                id: item.id,
                type: item.type,
                name: item.name,
                price: item.price
            }));

            const response = await apiService.submitOrder(orderSlices, quantity, 'Placed', formData);

            if (response.success) {
                // Keep the loader up for a fraction of a second longer for UX feel
                setTimeout(() => {
                    emptySlices();
                    setQuantity(1);
                    setIsPlacingOrder(false);
                    useBurgerStore.getState().showAlert("Order Placed Successfully!", 'success');
                    navigate('/');
                }, 1500);
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

    // Redirect to home if accessed directly without burger
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

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            {isPlacingOrder && <CheckoutLoader />}

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Left Side: Order Summary */}
                <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 border border-slate-200 h-fit">
                    <h2 className="text-2xl font-black text-slate-800 border-b pb-4 mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-8">
                        {slices.map((slice, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-700 font-medium">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                                    <span>{slice.name}</span>
                                </div>
                                <span className="font-bold text-slate-500">₹{slice.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <div className="space-y-3 text-sm font-bold text-slate-600">
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

                            <div className="flex justify-between pt-2 text-xl font-black text-slate-800">
                                <span>Total to Pay</span>
                                <span className="text-orange-600">₹{priceDetails.finalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Details Form */}
                <div className="flex-[1.2] bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
                    <h2 className="text-2xl font-black text-slate-800 border-b pb-4 mb-6">Delivery Details</h2>

                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Address</label>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800 resize-none"
                                placeholder="123 Burger Street, Food City"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-800 mb-4 pt-4 border-t">Select Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['UPI', 'NetBanking', 'CreditCard', 'DebitCard'].map(method => (
                                    <label key={method} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-500' : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                        />
                                        <span className="ml-3 font-bold text-slate-700">
                                            {method === "CreditCard" ? "Credit Card" : method === "DebitCard" ? "Debit Card" : method === "NetBanking" ? "Net Banking" : "UPI"}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 bg-slate-800 hover:bg-slate-900 text-white font-black text-lg py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            Place Order - ₹{priceDetails.finalPrice}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
