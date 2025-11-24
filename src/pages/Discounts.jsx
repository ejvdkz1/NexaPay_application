import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiscountCard = ({ brand, offer, code, category, imageColor }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-surface rounded-2xl overflow-hidden mb-4">
            <div className={`h-32 ${imageColor} relative`}>
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {offer}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-bold text-white text-lg">{brand}</h3>
            </div>
            <div className="p-4">
                <p className="text-slate-400 text-xs mb-4">Valid till Dec 31 • {category}</p>

                <div className="bg-black/30 border border-dashed border-slate-600 rounded-xl p-3 flex justify-between items-center">
                    <span className="font-mono font-bold text-primary tracking-wider">{code}</span>
                    <button
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        {copied ? <span className="text-green-500 text-xs">Copied!</span> : <Copy size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CategoryPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${isActive
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-surface text-slate-400 hover:bg-slate-700'
            }`}
    >
        {label}
    </button>
);

const Discounts = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Food & Beverage', 'Fashion', 'Shopping', 'Entertainment'];

    const discounts = [
        { id: 1, brand: "Karachi Bakery", offer: "20% OFF", code: "NEXA20", category: "Food & Beverage", imageColor: "bg-orange-500" },
        { id: 2, brand: "McDonald's", offer: "15% OFF", code: "MCNEXA15", category: "Food & Beverage", imageColor: "bg-red-600" },
        { id: 3, brand: "Outfitters", offer: "30% OFF", code: "OUTFIT30", category: "Fashion", imageColor: "bg-slate-600" },
        { id: 4, brand: "Gloria Jean's", offer: "Buy 1 Get 1", code: "COFFEE25", category: "Food & Beverage", imageColor: "bg-amber-700" },
        { id: 5, brand: "Gul Ahmed", offer: "10% OFF", code: "GULNEXA10", category: "Fashion", imageColor: "bg-emerald-600" },
    ];

    const filteredDiscounts = activeCategory === 'All'
        ? discounts
        : discounts.filter(d => d.category === activeCategory);

    return (
        <div className="px-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-white">Exclusive Discounts</h1>
                    <p className="text-xs text-slate-400">Save more with NexaPay</p>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 mb-4">
                {categories.map(cat => (
                    <CategoryPill
                        key={cat}
                        label={cat}
                        isActive={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                    />
                ))}
            </div>

            <div className="pb-20">
                <div className="grid grid-cols-1 gap-4">
                    {filteredDiscounts.map(discount => (
                        <DiscountCard
                            key={discount.id}
                            brand={discount.brand}
                            offer={discount.offer}
                            code={discount.code}
                            category={discount.category}
                            imageColor={discount.imageColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discounts;
