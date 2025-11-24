import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { TrendingUp, Lock, Target, Plus } from 'lucide-react';

const GoalCard = ({ icon: Icon, title, targetDate, current, target, color, onAddMoney }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-surface p-5 rounded-3xl mb-4"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{title}</h3>
                        <p className="text-xs text-slate-400">Target: {targetDate}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-white">Rs {current.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">of Rs {target.toLocaleString()}</p>
                </div>
            </div>

            <div className="w-full h-2 bg-slate-700 rounded-full mb-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>

            <div className="flex justify-between items-center text-xs">
                <span className={color.replace('bg-', 'text-')}>{percentage}% Complete</span>
                <span className="text-slate-400">Rs 5,000/month</span>
            </div>

            <button
                onClick={onAddMoney}
                className="w-full mt-4 py-3 bg-background rounded-xl text-primary font-medium text-sm hover:bg-slate-900 transition-colors"
            >
                Add Money
            </button>
        </motion.div>
    );
};

const Savings = () => {
    const { user, savings, addToSavings } = useApp();

    const handleAddMoney = (goalId) => {
        const amount = prompt("Enter amount to save:");
        if (amount) {
            const result = addToSavings(goalId, amount);
            if (!result.success) alert(result.message);
        }
    };

    const totalSavings = savings.reduce((acc, curr) => acc + curr.current, 0);
    const totalTarget = savings.reduce((acc, curr) => acc + curr.target, 0);
    const overallProgress = ((totalSavings / totalTarget) * 100).toFixed(1);

    return (
        <div className="px-6">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">My Savings</h1>
                <button className="ml-auto w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary">
                    <Plus size={20} />
                </button>
            </div>

            {/* Overview Card */}
            <div className="bg-white text-black rounded-[2rem] p-6 mb-8 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Savings</p>
                        <h2 className="text-3xl font-bold">Rs {totalSavings.toLocaleString()}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-600">Overall Progress</span>
                        <span className="font-bold text-green-600">{overallProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overallProgress}%` }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">Rs {(totalTarget - totalSavings).toLocaleString()} more to reach your goals</p>
                </div>
            </div>

            <h3 className="font-bold text-lg text-white mb-4">Savings Goals</h3>

            <div className="pb-20">
                {savings.map(goal => (
                    <GoalCard
                        key={goal.id}
                        icon={goal.icon === 'Lock' ? Lock : Target}
                        title={goal.title}
                        targetDate={goal.targetDate}
                        current={goal.current}
                        target={goal.target}
                        color={goal.color}
                        onAddMoney={() => handleAddMoney(goal.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Savings;
