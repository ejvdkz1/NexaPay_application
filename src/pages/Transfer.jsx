import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactAvatar = ({ initials, name, color, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-2 min-w-[70px]"
    >
        <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white font-bold text-lg border-2 transition-all ${isSelected ? 'border-primary scale-110' : 'border-transparent'}`}>
            {initials}
        </div>
        <span className={`text-[10px] font-medium ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
            {name}
        </span>
    </button>
);

const AmountChip = ({ amount, onClick }) => (
    <button
        onClick={() => onClick(amount)}
        className="bg-surface py-3 px-4 rounded-xl text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
    >
        Rs {amount.toLocaleString()}
    </button>
);

const Transfer = () => {
    const { transferMoney } = useApp();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('0');
    const [selectedContact, setSelectedContact] = useState(null);

    const handleAmountChange = (val) => {
        setAmount(val.toString());
    };

    const handleTransfer = () => {
        const result = transferMoney(amount, 'Ali Hassan'); // Hardcoded recipient for prototype
        if (result.success) {
            navigate('/dashboard');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="px-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-white">Transfer Money</h1>
            </div>

            {/* Amount Display */}
            <div className="flex flex-col items-center justify-center py-8 mb-8">
                <span className="text-slate-500 mb-2">PKR</span>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-5xl font-bold text-white text-center w-full focus:outline-none placeholder-slate-700"
                    placeholder="0"
                />
            </div>

            {/* Send To */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Send To</h3>
                    <button className="text-primary text-sm">See All</button>
                </div>

                <div className="bg-surface p-4 rounded-2xl flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        AH
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-white">Ali Hassan</h4>
                        <p className="text-xs text-slate-400">+92 300 1234567</p>
                    </div>
                    <button className="text-primary text-sm font-medium">Change</button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
                    <ContactAvatar initials="SK" name="Sara Khan" color="bg-violet-500" isSelected={selectedContact === 'SK'} onClick={() => setSelectedContact('SK')} />
                    <ContactAvatar initials="HS" name="Hamza S." color="bg-blue-500" isSelected={selectedContact === 'HS'} onClick={() => setSelectedContact('HS')} />
                    <ContactAvatar initials="FA" name="Fatima Ali" color="bg-pink-500" isSelected={selectedContact === 'FA'} onClick={() => setSelectedContact('FA')} />
                    <ContactAvatar initials="UA" name="Usman A." color="bg-green-500" isSelected={selectedContact === 'UA'} onClick={() => setSelectedContact('UA')} />
                    <ContactAvatar initials="ZK" name="Zain K." color="bg-orange-500" isSelected={selectedContact === 'ZK'} onClick={() => setSelectedContact('ZK')} />
                </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <AmountChip amount={1000} onClick={handleAmountChange} />
                <AmountChip amount={5000} onClick={handleAmountChange} />
                <AmountChip amount={10000} onClick={handleAmountChange} />
                <AmountChip amount={25000} onClick={handleAmountChange} />
            </div>

            <div className="flex items-center gap-2 text-slate-400 mb-auto">
                <Edit2 size={16} />
                <input
                    type="text"
                    placeholder="Add a note"
                    className="bg-transparent text-sm focus:outline-none text-white w-full"
                />
            </div>

            <button
                onClick={handleTransfer}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl mt-4 mb-4 shadow-lg shadow-primary/25"
            >
                Transfer Rs {parseInt(amount || 0).toLocaleString()}
            </button>
        </div>
    );
};

export default Transfer;
