import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initial Dummy Data
    const [user, setUser] = useState({
        name: 'Ali Hassan',
        email: 'ali.hassan@university.edu',
        balance: 628000,
        cardNumber: '**** 4582',
        isLoggedIn: false
    });

    const [transactions, setTransactions] = useState([
        { id: 1, title: 'Cafeteria Payment', date: 'Today, 12:30 PM', amount: 450, type: 'debit' },
        { id: 2, title: 'Semester Fee', date: 'Yesterday', amount: 25000, type: 'debit' },
        { id: 3, title: 'Received from Dad', date: 'Nov 20', amount: 50000, type: 'credit' },
        { id: 4, title: 'Book Store', date: 'Nov 18', amount: 2100, type: 'debit' },
    ]);

    const [savings, setSavings] = useState([
        { id: 1, title: 'Emergency Fund', targetDate: 'Dec 2025', current: 342500, target: 500000, color: 'bg-blue-500', icon: 'Lock' },
        { id: 2, title: 'Vacation to Maldives', targetDate: 'Mar 2026', current: 187500, target: 300000, color: 'bg-violet-500', icon: 'Target' },
        { id: 3, title: 'New Laptop', targetDate: 'Jan 2025', current: 98000, target: 150000, color: 'bg-pink-500', icon: 'Target' },
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Welcome to NexaPay!', message: 'Your account has been successfully created.', time: '2 days ago', isRead: true },
        { id: 2, title: 'Payment Received', message: 'You received Rs 50,000 from Dad.', time: 'Nov 20', isRead: false },
        { id: 3, title: 'Security Alert', message: 'New login detected from iPhone 13.', time: 'Nov 18', isRead: true },
    ]);

    // Actions
    const login = (email, password) => {
        // In a real app, validate credentials here
        setUser(prev => ({ ...prev, isLoggedIn: true }));
        return true;
    };

    const logout = () => {
        setUser(prev => ({ ...prev, isLoggedIn: false }));
    };

    const markAllNotificationsAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const transferMoney = (amount, recipientName) => {
        const value = parseInt(amount);
        if (value > user.balance) return { success: false, message: 'Insufficient balance' };

        // Deduct from balance
        setUser(prev => ({ ...prev, balance: prev.balance - value }));

        // Add transaction
        const newTransaction = {
            id: Date.now(),
            title: `Transfer to ${recipientName}`,
            date: 'Just now',
            amount: value,
            type: 'debit'
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // Add notification
        const newNotification = {
            id: Date.now(),
            title: 'Money Sent',
            message: `You sent Rs ${value.toLocaleString()} to ${recipientName}`,
            time: 'Just now',
            isRead: false
        };
        setNotifications(prev => [newNotification, ...prev]);

        return { success: true, message: 'Transfer successful' };
    };

    const addToSavings = (goalId, amount) => {
        const value = parseInt(amount);
        if (value > user.balance) return { success: false, message: 'Insufficient balance' };

        // Deduct from balance
        setUser(prev => ({ ...prev, balance: prev.balance - value }));

        // Update goal
        setSavings(prev => prev.map(goal => {
            if (goal.id === goalId) {
                return { ...goal, current: goal.current + value };
            }
            return goal;
        }));

        // Add transaction record
        const goalTitle = savings.find(g => g.id === goalId)?.title;
        const newTransaction = {
            id: Date.now(),
            title: `Saved for ${goalTitle}`,
            date: 'Just now',
            amount: value,
            type: 'debit'
        };
        setTransactions(prev => [newTransaction, ...prev]);

        return { success: true, message: 'Added to savings' };
    };

    return (
        <AppContext.Provider value={{
            user,
            transactions,
            savings,
            notifications,
            login,
            logout,
            transferMoney,
            addToSavings,
            markAllNotificationsAsRead
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
