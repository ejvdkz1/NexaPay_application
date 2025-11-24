import React from 'react';
import BottomNav from './BottomNav';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black flex justify-center items-start sm:items-center sm:py-8">
            <div className="w-full max-w-[480px] h-screen sm:h-[850px] bg-background sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800 relative overflow-hidden shadow-2xl flex flex-col">
                {/* Status Bar Simulation */}
                <div className="h-8 w-full bg-transparent absolute top-0 left-0 z-50 flex justify-between items-center px-6 text-xs font-medium text-white/70 pointer-events-none">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full border border-white/30" />
                        <div className="w-4 h-4 rounded-full border border-white/30" />
                        <div className="w-6 h-3 rounded-sm border border-white/30 relative">
                            <div className="absolute inset-0.5 bg-white/80 rounded-[1px] w-[70%]" />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto pb-20 pt-10 scrollbar-hide"
                >
                    {children}
                </motion.main>

                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;
