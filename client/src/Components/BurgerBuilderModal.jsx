import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BurgerVisualizer from './BurgerVisualizer.jsx';
import IngredientControls from './IngredientControls.jsx';
import PriceSummary from './PriceSummary.jsx';

const BurgerBuilderModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 m-auto w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Side - Visualizer (Scrollable if needed, but mostly fixed) */}
                        <div className="flex-1 bg-yellow-50 relative p-8 flex flex-col items-center justify-center border-r border-slate-200 overflow-y-auto">
                            <h2 className="text-3xl font-black text-red-900 absolute top-8 left-8 italic uppercase tracking-tight">Your Burger</h2>
                            <BurgerVisualizer />
                        </div>

                        {/* Right Side - Controls & Price Summary */}
                        <div className="w-full md:w-[450px] bg-white overflow-y-auto">
                            <div className="p-6 md:p-8">
                                <IngredientControls />
                            </div>
                            <div className="p-6 md:p-8 border-t border-slate-200 bg-slate-50">
                                <PriceSummary onClose={onClose} />
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BurgerBuilderModal;
