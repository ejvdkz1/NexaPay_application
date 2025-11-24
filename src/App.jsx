import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Savings from './pages/Savings';
import Transfer from './pages/Transfer';
import Discounts from './pages/Discounts';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import ScanQR from './pages/ScanQR';
import Receipt from './pages/Receipt';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { AppProvider } from './context/AppContext';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/savings" element={<Layout><Savings /></Layout>} />
                <Route path="/transfer" element={<Layout><Transfer /></Layout>} />
                <Route path="/discounts" element={<Layout><Discounts /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
                <Route path="/scan" element={<ScanQR />} />
                <Route path="/receipt/:id" element={<Layout><Receipt /></Layout>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const [showSplash, setShowSplash] = React.useState(true);

    return (
        <AppProvider>
            <Router>
                <AnimatePresence mode="wait">
                    {showSplash ? (
                        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
                    ) : (
                        <AnimatedRoutes key="routes" />
                    )}
                </AnimatePresence>
            </Router>
        </AppProvider>
    );
}

export default App;
