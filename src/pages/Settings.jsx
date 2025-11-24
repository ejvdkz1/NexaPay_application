import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingItem = ({ icon: Icon, label, onClick, isDestructive }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-surface rounded-2xl mb-3 hover:bg-slate-800 transition-colors"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-500/10 text-red-500' : 'bg-slate-700/50 text-slate-300'}`}>
                <Icon size={20} />
            </div>
            <span className={`font-medium ${isDestructive ? 'text-red-500' : 'text-white'}`}>{label}</span>
        </div>
        <ChevronRight size={20} className="text-slate-500" />
    </button>
);

const Settings = () => {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="px-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-white">Settings</h1>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-primary/25">
                    {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-slate-400 text-sm">{user.email}</p>
            </div>

            {/* Options */}
            <div className="flex-1">
                <h3 className="text-slate-500 text-sm font-medium mb-4 uppercase tracking-wider">General</h3>
                <SettingItem icon={User} label="Edit Profile" onClick={() => { }} />
                <SettingItem icon={Bell} label="Notifications" onClick={() => navigate('/notifications')} />
                <SettingItem icon={Lock} label="Security" onClick={() => { }} />
                <SettingItem icon={HelpCircle} label="Help & Support" onClick={() => { }} />

                <div className="mt-8">
                    <SettingItem
                        icon={LogOut}
                        label="Sign Out"
                        onClick={handleLogout}
                        isDestructive
                    />
                </div>
            </div>

            <p className="text-center text-slate-600 text-xs py-6">
                Version 1.0.0
            </p>
        </div>
    );
};

export default Settings;
