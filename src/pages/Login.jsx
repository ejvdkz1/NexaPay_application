import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, CreditCard, Fingerprint } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
    <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={20} />
        </div>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-surface border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
    </div>
);

const Login = () => {
    const { login } = useApp();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        cardNumber: ''
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            login(formData.email, formData.password);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex justify-center items-center p-4">
            <div className="w-full max-w-[480px] bg-background sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800 h-screen sm:h-[850px] relative overflow-hidden flex flex-col justify-center px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        NexaPay
                    </h1>
                    <p className="text-slate-400">Your Campus. Your Wallet.</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={handleLogin}
                >
                    <InputField
                        icon={Mail}
                        type="email"
                        placeholder="University Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <InputField
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <InputField
                        icon={CreditCard}
                        type="text"
                        placeholder="University Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Login to Account <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center mt-8"
                >
                    <p className="text-slate-500 text-xs mb-4">Or sign in with</p>
                    <button
                        onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                                login('ali.hassan@university.edu', 'password');
                                navigate('/dashboard');
                            }, 2000);
                        }}
                        className="w-16 h-16 rounded-full bg-surface border border-slate-700 flex items-center justify-center text-primary hover:bg-slate-800 hover:scale-105 transition-all shadow-lg shadow-primary/10"
                    >
                        <Fingerprint size={32} />
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-slate-500 text-sm mt-8"
                >
                    Forgot your credentials? <span className="text-primary cursor-pointer">Contact Admin</span>
                </motion.p>
            </div>
        </div>
    );
};

export default Login;
