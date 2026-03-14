import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="absolute w-full top-0 left-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 md:py-8 flex justify-between items-center">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 z-50">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl shadow-[4px_4px_0px_#b91c1c] rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer">
                        🍔
                    </div>
                    <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-red-600">
                        BURGER<span className="text-yellow-500">BUILDER</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6 md:gap-8 font-black text-lg">
                    <Link 
                        to="/" 
                        className={`transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-slate-500 hover:text-red-500'}`}
                    >
                        BUILD
                    </Link>
                    <Link 
                        to="/orders" 
                        className={`transition-colors ${location.pathname === '/orders' ? 'text-red-600' : 'text-slate-500 hover:text-red-500'}`}
                    >
                        HISTORY
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
