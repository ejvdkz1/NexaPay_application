import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ScanLine, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ScanQR = () => {
    const navigate = useNavigate();
    const { transferMoney } = useApp();
    const [scanning, setScanning] = useState(true);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (scanning) {
            const timer = setTimeout(() => {
                setScanning(false);
                setScanned(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanning]);

    const handlePayment = () => {
        // Simulate payment to a merchant
        transferMoney(250, 'Campus Cafeteria');
        navigate('/dashboard');
    };

    return (
        <div className="h-screen bg-black relative flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={() => navigate(-1)} className="text-white p-2 bg-black/20 backdrop-blur-md rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-white font-bold text-lg">Scan to Pay</h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Camera Viewfinder (Fake) */}
            <div className="flex-1 relative overflow-hidden">
                {/* Background Image simulating camera feed - using a dark gradient placeholder for now */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50" />

                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                        {/* Scanning Line Animation */}
                        {scanning && (
                            <motion.div
                                animate={{ top: ['10%', '90%', '10%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-4 right-4 h-0.5 bg-primary shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                            />
                        )}
                    </div>
                </div>

                {/* Status Text */}
                <div className="absolute bottom-32 left-0 right-0 text-center">
                    <p className="text-white/80 bg-black/40 backdrop-blur-md py-2 px-6 rounded-full inline-block">
                        {scanning ? 'Align QR code within frame' : 'QR Code Detected!'}
                    </p>
                </div>
            </div>

            {/* Payment Modal (Simulated) */}
            {scanned && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-[2rem] p-6 z-30 border-t border-slate-700"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Campus Cafeteria</h3>
                            <p className="text-slate-400 text-sm">Merchant ID: #88291</p>
                        </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl mb-6 flex justify-between items-center">
                        <span className="text-slate-400">Amount</span>
                        <span className="text-2xl font-bold text-white">Rs 250.00</span>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25"
                    >
                        Pay Now
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default ScanQR;
