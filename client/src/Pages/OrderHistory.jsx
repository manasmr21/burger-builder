import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import Loader from '../Components/Loader';
import useBurgerStore from '../store/burgerStore';
import ConfirmModal from '../Components/ConfirmModal';
import BurgerStack from '../Components/BurgerStack';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const { showAlert } = useBurgerStore();


    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.getOrders();
            if (data.success && data.orders) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Error fetching order history", error);
            showAlert("Failed to load your orders.", "error");
        }
        setIsLoading(false);
    };

    const handleCancelOrder = async (orderId) => {

        try {
            const res = await apiService.updateOrderStatus(orderId, 'Cancelled');
            if (res.success) {
                showAlert("Order cancelled successfully.", "success");
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
            } else {
                showAlert(res.message || "Failed to cancel order.", "error");
            }
        } catch (error) {
            console.error("Failed to cancel order:", error);
            showAlert("An error occurred while cancelling.", "error");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader message="Fetching your past orders..." /></div>;
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <span className="text-6xl mb-6">🍽️</span>
                <h2 className="text-2xl font-black text-slate-800">No Orders Yet</h2>
                <p className="text-slate-500 mt-2 font-medium">Your order history is empty. Go build a burger!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-slate-800 mb-8 border-b pb-4">Your Recent Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order #{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="text-sm font-medium text-slate-600 mt-1">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${order.status === 'Placed' || order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                        {order.status || 'Placed'}
                                    </span>
                                    <span className="text-2xl font-black text-orange-600">
                                        ₹{order.priceDetails?.finalPrice}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800 mb-3">Burger Details ({order.quantity}x)</p>
                                    <BurgerStack slices={order.slices} maxWidthClass="max-w-[220px]" />
                                </div>

                                {order.customerDetails?.name && (
                                    <div className="hidden md:block w-48 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-500 mb-1">
                                            {order.status === 'Placed' ? 'Delivering to' : 'Delivered to'}
                                        </p>
                                        <p className="text-sm font-bold text-slate-800 truncate">{order.customerDetails.name}</p>
                                        <p className="text-xs text-slate-600 truncate">{order.customerDetails.paymentMethod}</p>
                                    </div>
                                )}
                            </div>

                            {order.status === 'Placed' && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setOrderToCancel(order._id)}
                                        className="text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={!!orderToCancel}
                onClose={() => setOrderToCancel(null)}
                onConfirm={() => handleCancelOrder(orderToCancel)}
                title="Cancel Order"
                message="Are you sure you want to cancel this order? This action cannot be undone."
            />
        </div>
    );
};

export default OrderHistory;
