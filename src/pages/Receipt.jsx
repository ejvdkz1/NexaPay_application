import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle, Share2, Download } from 'lucide-react';

const Receipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { transactions } = useApp();

    const transaction = transactions.find(t => t.id.toString() === id);

    if (!transaction) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white">
                <p>Transaction not found</p>
                <button onClick={() => navigate('/dashboard')} className="text-primary mt-4">Go Home</button>
            </div>
        );
    }

    return (
        <div className="px-6 h-full flex flex-col bg-black">
            <div className="flex items-center gap-4 mb-8 pt-6">
                <button onClick={() => navigate(-1)} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-white">Transaction Details</h1>
            </div>

            <div className="bg-surface rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />

                <div className="flex flex-col items-center mb-8 mt-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-slate-400 text-sm mb-1">Payment Successful</h2>
                    <h1 className="text-4xl font-bold text-white">Rs {transaction.amount.toLocaleString()}</h1>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 text-sm">To</span>
                        <span className="text-white font-medium">{transaction.title}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 text-sm">Date</span>
                        <span className="text-white font-medium">{transaction.date}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 text-sm">Reference ID</span>
                        <span className="text-white font-medium font-mono text-xs">#REF-{transaction.id}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 text-sm">Status</span>
                        <span className="text-green-400 font-medium text-xs bg-green-400/10 px-2 py-1 rounded-lg">Completed</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 bg-slate-700/50 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                        <Share2 size={18} /> Share
                    </button>
                    <button className="flex-1 bg-slate-700/50 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                        <Download size={18} /> PDF
                    </button>
                </div>
            </div>

            <div className="mt-auto pb-8 text-center">
                <p className="text-slate-600 text-xs">NexaPay Secure Transaction</p>
            </div>
        </div>
    );
};

export default Receipt;
