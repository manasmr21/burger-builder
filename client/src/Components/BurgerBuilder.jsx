import BreadBottom from "./slices/BreadBottom";
import BreadTop from "./slices/BreadTop";
import AlooTikki from "./slices/AlooTikki";
import Cheese from "./slices/Cheese";
import Onion from "./slices/Onion";
import Tomato from "./slices/Tomato";
import Paneer from "./slices/Paneer";
import Lettuce from "./slices/Lettuce";
import { apiService } from "../services/apiService";
import { useEffect, useState } from "react";
import useBurgerStore from "../store/burgerStore";
import CustomDragLayer from "./CustomDragLayer";
import { calculatePrice } from "../utils/priceCalculator";

const ingredientComponents = {
    aloo_tikki: AlooTikki,
    paneer: Paneer,
    cheese: Cheese,
    tomato: Tomato,
    onion: Onion,
    lettuce: Lettuce
}

const toTypeKey = (name) => name.toLowerCase().replace(/\s+/g, '_');

const BurgerBuilder = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { setIngredientsBurger, setLoading, isLoading, ingredients, slices, addSlice, removeSlice } = useBurgerStore();

    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const data = await apiService.getIngredients();

            if (data.success) {
                setIngredientsBurger(data.ingredients);
            }
        } catch (error) {
            console.log(error.message || "Error in getting the ingredients");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchIngredients();
    }, [])

    function moveSlice(fromIndex, toIndex) {
        const updated = [...slices];
        const [removed] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, removed);
        // Update slices directly via store
        useBurgerStore.setState({ slices: updated });
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
            <div className="absolute inset-0 z-0" onClick={onClose}></div>
            <CustomDragLayer />

            <div className="relative z-10 w-full md:w-[60%] max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 px-3 py-2 font-extrabold bg-slate-200 hover:bg-slate-400 rounded-full transition-colors text-slate-800"
                >
                    ✕
                </button>

                {isLoading || !ingredients ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-bold text-lg">Loading ingredients...</p>
                    </div>
                ) : (
                    <div className="text-slate-700 flex leading-relaxed font-medium py-8">
                        <div className="left w-2/3">
                            <div className="burger-visualizer">
                                <BreadTop />
                                {slices?.map((item, idx) => {
                                    const typeKey = toTypeKey(item.name);
                                    const SliceComponent = ingredientComponents[typeKey];
                                    if (!SliceComponent) return null;
                                    return (
                                        <div key={item.id + '-' + idx} className="relative group flex justify-center w-full z-10 hover:z-20 transition-transform">
                                            <SliceComponent id={item.id} index={idx} moveSlice={moveSlice} />
                                            <button
                                                onClick={() => removeSlice(item.id)}
                                                className="absolute left-2 md:-left-1 top-1/2 -translate-y-1/2 z-50 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md hover:scale-110"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    );
                                })}
                                <BreadBottom />
                            </div>
                        </div>


                        {/* ------------------------ Slices -------------- */}
                        <div className="right w-[45%]">
                            <div className="slices flex flex-wrap gap-2">
                                {
                                    ingredients?.map((item, idx) => {
                                        const bgColor = item.color || 'bg-slate-500';
                                        return (
                                            <div
                                                key={item.id + '-' + idx}
                                                onClick={() => addSlice({ type: toTypeKey(item.name), name: item.name, price: item.price })}
                                                className={`px-4 py-3 rounded-xl text-white font-bold flex items-center justify-between gap-4 ${bgColor} shadow-md hover:scale-105 transition-transform cursor-pointer active:scale-95 select-none`}
                                            >
                                                <span className="text-sm tracking-wide">{item.name}</span>
                                                <span className="bg-white/25 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">₹{item.price}</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>


                            {/* ---------------- Price calculator --------------- */}
                            {(() => {
                                const mapped = slices?.map(item => ({ type: item.type || toTypeKey(item.name) })) || [];
                                const price = calculatePrice(mapped);
                                return (
                                    <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                        <h3 className="text-lg font-extrabold text-slate-800 mb-3">Price Summary</h3>
                                        {slices?.length > 6 && (
                                            <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold border border-amber-200 flex items-center gap-2 shadow-sm">
                                                <span className="text-lg">👨‍🍳</span>
                                                Chef suggests splitting the burger into two!
                                            </div>
                                        )}
                                        <div className="space-y-2 text-sm font-medium text-slate-600">
                                            <div className="flex justify-between">
                                                <span>Base Price ({slices?.length || 0} items)</span>
                                                <span>₹{price.basePrice}</span>
                                            </div>
                                            {price.discount > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>Cheese + Paneer Combo</span>
                                                    <span>-₹{price.discount}</span>
                                                </div>
                                            )}
                                            {price.penalty > 0 && (
                                                <div className="flex justify-between text-amber-600">
                                                    <span>Extra Aloo Tikki Fee</span>
                                                    <span>+₹{price.penalty}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span>Platform Fee</span>
                                                <span>₹{price.platformFee}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-300 flex justify-between items-center">
                                            <span className="text-base font-extrabold text-slate-800">Total</span>
                                            <span className="text-2xl font-black text-orange-600">
                                                ₹{price.finalPrice}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BurgerBuilder;