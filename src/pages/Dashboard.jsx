import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, QrCode, Search, Bell } from 'lucide-react';
import SpendingGraph from '../components/SpendingGraph';

const ActionButton = ({ icon: Icon, label, color }) => (
    <motion.button
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2"
    >
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-slate-300">{label}</span>
    </motion.button>
);

const TransactionItem = ({ title, date, amount, type }) => (
    <div className="flex items-center justify-between p-4 bg-surface rounded-2xl mb-3">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'credit' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                <ArrowUpRight size={20} className={type === 'credit' ? 'rotate-180' : ''} />
            </div>
            <div>
                <h4 className="font-medium text-white">{title}</h4>
                <p className="text-xs text-slate-400">{date}</p>
            </div>
        </div>
        <span className={`font-bold ${type === 'credit' ? 'text-green-400' : 'text-white'}`}>
            {type === 'credit' ? '+' : '-'} Rs {amount}
        </span>
    </div>
);

const Dashboard = () => {
    const { user, transactions, notifications } = useApp();
    const navigate = useNavigate();

    return (
        <div className="px-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div onClick={() => navigate('/settings')} className="cursor-pointer">
                    <p className="text-slate-400 text-sm">Welcome back,</p>
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                </div>
                <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-white">
                        <Search size={20} />
                    </button>
                    <button
                        onClick={() => navigate('/notifications')}
                        className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-white relative"
                    >
                        <Bell size={20} />
                        {notifications.some(n => !n.isRead) && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </button>
                </div>
            </div>

            {/* Balance Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-gradient-to-br from-primary to-secondary rounded-[2rem] p-6 text-white shadow-xl shadow-primary/20 mb-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <p className="text-white/80 mb-1">Total Balance</p>
                <h1 className="text-4xl font-bold mb-6">Rs {user.balance.toLocaleString()}</h1>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">Student Account</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">{user.cardNumber}</span>
                </div>
            </motion.div>

            <SpendingGraph />

            {/* Quick Actions */}
            <div className="flex justify-between px-2 mb-8">
                <div onClick={() => navigate('/transfer')}>
                    <ActionButton icon={ArrowUpRight} label="Transfer" color="bg-blue-500" />
                </div>
                <ActionButton icon={Plus} label="Top Up" color="bg-violet-500" />
                <div onClick={() => navigate('/scan')}>
                    <ActionButton icon={QrCode} label="Scan" color="bg-cyan-500" />
                </div>
                <ActionButton icon={ArrowUpRight} label="Request" color="bg-pink-500" />
            </div>

            {/* Recent Transactions */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-white">Recent Activity</h3>
                    <button className="text-primary text-sm">See All</button>
                </div>

                <div className="pb-20">
                    {transactions.map(tx => (
                        <div key={tx.id} onClick={() => navigate(`/receipt/${tx.id}`)} className="cursor-pointer">
                            <TransactionItem
                                title={tx.title}
                                date={tx.date}
                                amount={tx.amount.toLocaleString()}
                                type={tx.type}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
