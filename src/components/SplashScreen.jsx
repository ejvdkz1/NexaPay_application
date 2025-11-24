import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500); // Total duration before unmounting

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Container */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1.5
                    }}
                    className="mb-6 relative"
                >
                    {/* Custom N Logo SVG */}
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-2xl"
                    >
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan-500 */}
                                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Background Circle (Optional, for depth) */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#logoGradient)"
                            strokeWidth="2"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0, rotate: -90 }}
                            animate={{ pathLength: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* The 'N' Shape */}
                        <motion.path
                            d="M30 25 L30 75 L70 25 L70 75"
                            stroke="url(#logoGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        />
                    </svg>
                </motion.div>

                {/* Text Container */}
                <div className="text-center">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider font-sans"
                    >
                        NexaPay
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="text-gray-400 mt-2 text-sm font-medium tracking-wide"
                    >
                        Your Campus. Your Wallet.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
