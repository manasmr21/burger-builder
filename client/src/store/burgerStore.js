import { create } from 'zustand';
import { calculatePrice } from '../utils/priceCalculator.js';

const initialSlices = [
    { id: '1', type: 'bread' },
    { id: '2', type: 'bread' }
];

const useBurgerStore = create((set, get) => ({
    slices: initialSlices,
    quantity: 1,

    addSlice: (type) => set((state) => {
        if (state.slices.length >= 10) return state; // Max 10 slices
        const newSlice = { id: Date.now().toString() + Math.random().toString(36).substring(7), type };
        const newSlices = [...state.slices];
        // Insert before the last bread
        newSlices.splice(newSlices.length - 1, 0, newSlice);
        return { slices: newSlices };
    }),

    removeSlice: (id) => set((state) => {
        const sliceToRemove = state.slices.find(s => s.id === id);
        if (!sliceToRemove || sliceToRemove.type === 'bread') return state;
        return { slices: state.slices.filter(s => s.id !== id) };
    }),

    reorderSlices: (startIndex, endIndex) => set((state) => {
        // Prevent moving the top and bottom bread
        if (startIndex === 0 || startIndex === state.slices.length - 1) return state;
        if (endIndex === 0 || endIndex === state.slices.length - 1) return state;

        const result = Array.from(state.slices);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return { slices: result };
    }),

    setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),

    resetBurger: () => set({ slices: initialSlices, quantity: 1 }),

    getPriceDetails: () => {
        const state = get();
        return calculatePrice(state.slices, state.quantity);
    }
}));

export default useBurgerStore;
