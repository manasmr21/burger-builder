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
            alert: { isOpen: false, message: '', type: 'success' },
            customerDetails: {
                name: '',
                phone: '',
                address: '',
                paymentMethod: 'UPI'
            },

            addSlice: (slice) => set((state) => {
                if (state.slices.length >= 10) {
                    return {
                        alert: { isOpen: true, message: 'Cannot add more slices', type: 'error' }
                    };
                }
                return { slices: [...state.slices, { ...slice, ingredientId: Date.now() + Math.random() }] };
            }),

            removeSlice: (id) => set((state) => ({
                slices: state.slices.filter(s => s.ingredientId !== id)
            })),

            emptySlices: () => set({ slices: [] }),

            setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),

            setLoading: (loading) => set({ isLoading: loading }),

            showAlert: (message, type = 'success') => set({ alert: { isOpen: true, message, type } }),
            
            hideAlert: () => set((state) => ({ alert: { ...state.alert, isOpen: false } })),

            resetBurger: () => set({ slices: [], quantity: 1 }),

            setIngredientsBurger: (ingredients) => set({ ingredients }),

            setCustomerDetails: (details) => set({ customerDetails: { ...details } }),

            clearCustomerDetails: () => set({
                customerDetails: { name: '', phone: '', address: '', paymentMethod: 'UPI' }
            }),

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
