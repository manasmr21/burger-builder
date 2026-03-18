import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBurgerStore from '../store/burgerStore';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { slices, setCustomerDetails } = useBurgerStore();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'UPI'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, phone: digitsOnly });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleProceedToCart = (e) => {
        e.preventDefault();

        if (slices.length === 0) {
            useBurgerStore.getState().showAlert('Your burger has no slices!', 'error');
            navigate('/');
            return;
        }

        setCustomerDetails(formData);
        navigate('/cart');
    };

    // Redirect to home if accessed directly without burger
    if (slices.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
                <h1 className="text-3xl font-black text-slate-800 mb-4">Your Burger is Empty</h1>
                <button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md">
                    Build a Burger
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">
                    <h2 className="text-xl font-black text-slate-800 border-b pb-3 mb-4">Delivery Details</h2>

                    <form onSubmit={handleProceedToCart} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800"
                                    placeholder="0000000000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Delivery Address</label>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                rows="2"
                                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-bold text-slate-800 resize-none"
                                placeholder="123 Burger Street, Food City"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-800 mb-3 pt-3 border-t">Select Payment Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['UPI', 'NetBanking', 'CreditCard', 'DebitCard', 'Cash', 'COD'].map(method => (
                                    <label key={method} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-500' : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                        />
                                        <span className="ml-3 font-bold text-slate-700">
                                            {method === "CreditCard" ? "Credit Card" : method === "DebitCard" ? "Debit Card" : method === "NetBanking" ? "Net Banking" : method === "COD" ? "Cash on Delivery" : method}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-black text-base py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            Continue to Cart
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
