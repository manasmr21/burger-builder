import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';
import burgerImage from '../assets/hero_burger.png';
import BurgerBuilderModal from '../Components/BurgerBuilderModal.jsx';

const Homepage = () => {
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);

    return (
        <div className="h-screen w-full bg-yellow-50 text-slate-800 font-sans overflow-hidden selection:bg-red-400 selection:text-white relative">

            {/* Floating Logo Top-Left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-3 z-50">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl shadow-[4px_4px_0px_#b91c1c] rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer">
                    🍔
                </div>
                <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-red-600">
                    BURGER<span className="text-yellow-500">BLITZ</span>
                </span>
            </div>

            {/* Hero Section */}
            <main className="relative w-full max-w-[1400px] h-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 pt-20 lg:pt-0">

                {/* Background decorative elements */}
                <div className="absolute top-10 right-20 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-10 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                {/* Left Content Area */}
                <div className="flex-1 text-center lg:text-left z-10 w-full">

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] text-red-900 uppercase italic mb-6 tracking-tight"
                    >
                        BUILD IT <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-yellow-500">
                            YOUR WAY.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-slate-600 font-bold mb-10 max-w-xl mx-auto lg:mx-0"
                    >
                        Start dragging & dropping. We layer the freshest ingredients to perfection and deliver it hot.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center lg:justify-start"
                    >
                        <button
                            onClick={() => setIsBuilderOpen(true)}
                            className="bg-red-600 text-white border-4 border-red-900 text-xl px-10 py-5 rounded-[2rem] font-black uppercase tracking-wider shadow-[8px_8px_0px_#7f1d1d] hover:shadow-[4px_4px_0px_#7f1d1d] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-3 w-full sm:w-auto justify-center group"
                        >
                            MAKE A BURGER
                            <ChevronRight className="group-hover:translate-x-2 transition-transform stroke-[3px]" />
                        </button>

                    </motion.div>

                </div>

                {/* Right Image Area */}
                <div className="flex-1 w-full relative flex justify-center items-center z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                        className="relative w-full max-w-[600px] aspect-square rounded-full border-[16px] border-white shadow-[0_20px_50px_rgba(220,38,38,0.2)] bg-yellow-300 flex items-center justify-center overflow-hidden"
                    >
                        {/* Sunburst background effect */}
                        <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,#fef08a_0deg_15deg,#fde047_15deg_30deg)] opacity-50 animate-[spin_60s_linear_infinite]"></div>

                        <motion.img
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            src={burgerImage}
                            alt="Delicious Custom Burger Layout"
                            className="relative z-10 w-[95%] h-[95%] object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                </div>

            </main>

            {/* Burger Builder Modal */}
            <BurgerBuilderModal
                isOpen={isBuilderOpen}
                onClose={() => setIsBuilderOpen(false)}
            />
        </div>
    );
};

export default Homepage;