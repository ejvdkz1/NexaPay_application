import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, ArrowRightLeft, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ to, icon: Icon, label, isActive }) => (
    <Link to={to} className="flex flex-col items-center justify-center w-full h-full relative">
        {isActive && (
            <motion.div
                layoutId="nav-active"
                className="absolute -top-1 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        <Icon
            size={24}
            className={`mb-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-400'}`}
        />
        <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
            {label}
        </span>
    </Link>
);

const BottomNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-t border-slate-700/50 flex items-center justify-around px-2 z-50 max-w-[480px] mx-auto">
            <NavItem to="/dashboard" icon={Home} label="Home" isActive={currentPath === '/dashboard'} />
            <NavItem to="/savings" icon={Wallet} label="Savings" isActive={currentPath === '/savings'} />
            <NavItem to="/transfer" icon={ArrowRightLeft} label="Transfer" isActive={currentPath === '/transfer'} />
            <NavItem to="/discounts" icon={Tag} label="Discounts" isActive={currentPath === '/discounts'} />
        </div>
    );
};

export default BottomNav;
