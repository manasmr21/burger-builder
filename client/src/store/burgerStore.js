import { create } from 'zustand';
import { calculatePrice } from '../utils/priceCalculator.js';
import { apiService } from '../services/apiService';

const initialSlices = [
    { _uid: '1-top', id: 0, type: 'bread' },
    { _uid: '2-bottom', id: 0, type: 'bread' }
];

const useBurgerStore = create((set, get) => ({
    availableIngredients: [],
    isLoadingIngredients: false,
    
    slices: initialSlices,
    quantity: 1,

    fetchIngredients: async () => {
        set({ isLoadingIngredients: true });
        try {
            const data = await apiService.getIngredients();
            if (data.success) {
                set({ availableIngredients: data.ingredients });
            }
        } catch (error) {
            console.error("Failed to fetch ingredients", error);
        } finally {
            set({ isLoadingIngredients: false });
        }
    },

    addSlice: (ingredient) => set((state) => {
        if (state.slices.length >= 10) return state; // Max 10 slices
        const newSlice = { _uid: Date.now().toString() + Math.random().toString(36).substring(7), type: ingredient.name.toLowerCase().replace(' ', '_'), id: ingredient.id, price: ingredient.price };
        const newSlices = [...state.slices];
        // Insert before the last bread
        newSlices.splice(newSlices.length - 1, 0, newSlice);
        return { slices: newSlices };
    }),

    removeSlice: (_uid) => set((state) => {
        const sliceToRemove = state.slices.find(s => s._uid === _uid);
        if (!sliceToRemove || sliceToRemove.type === 'bread') return state;
        return { slices: state.slices.filter(s => s._uid !== _uid) };
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
        // Fallback for local calculation while building (will be overwritten by backend on submit)
        // We now have prices directly attached to the slice objects when added.
        let basePrice = 0;
        state.slices.forEach(slice => {
            if (slice.price) basePrice += slice.price;
        });
        
        const discount = 0;
        const penalty = 0;
        const platformFee = 2;
        
        return {
            basePrice: basePrice * state.quantity,
            discount,
            penalty,
            platformFee,
            finalPrice: (basePrice * state.quantity) - discount + penalty + platformFee
        };
    }
}));

export default useBurgerStore;
