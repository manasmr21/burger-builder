import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculatePrice } from '../utils/priceCalculator';

const useBurgerStore = create(
    persist(
        (set, get) => ({
            slices: [],
            quantity: 1,
            ingredients: [],
            isLoading: false,

            addSlice: (slice) => set((state) => {
                if (state.slices.length >= 10) return state;
                return { slices: [...state.slices, { ...slice, id: Date.now() + Math.random() }] };
            }),

            removeSlice: (id) => set((state) => ({
                slices: state.slices.filter(s => s.id !== id)
            })),

            setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),

            setLoading: (loading) => set({ isLoading: loading }),

            resetBurger: () => set({ slices: [], quantity: 1 }),

            setIngredientsBurger: (ingredients) => set({ ingredients }),

            getPriceDetails: () => {
                const state = get();
                return calculatePrice(state.slices, state.quantity);
            }
        }),
        {
            name: 'burger-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useBurgerStore;
