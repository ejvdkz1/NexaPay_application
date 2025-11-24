import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationItem = ({ title, message, time, isRead }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-2xl mb-3 ${isRead ? 'bg-surface/50' : 'bg-surface border border-primary/30'}`}
    >
        <div className="flex justify-between items-start mb-1">
            <h4 className={`font-bold ${isRead ? 'text-slate-300' : 'text-white'}`}>{title}</h4>
            <span className="text-[10px] text-slate-500">{time}</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
    </motion.div>
);

const Notifications = () => {
    const { notifications, markAllNotificationsAsRead } = useApp();
    const navigate = useNavigate();

    return (
        <div className="px-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-white">Notifications</h1>
                </div>
                <button
                    onClick={markAllNotificationsAsRead}
                    className="text-primary text-xs font-medium flex items-center gap-1"
                >
                    <Check size={14} /> Mark all read
                </button>
            </div>

            <div className="pb-20">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <Bell size={48} className="mb-4 opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    notifications.map(n => (
                        <NotificationItem
                            key={n.id}
                            title={n.title}
                            message={n.message}
                            time={n.time}
                            isRead={n.isRead}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
