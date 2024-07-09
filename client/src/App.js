import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Phase0 from './pages/Phase0';
import Phase1 from './pages/Phase1';
import Phase2 from './pages/Phase2';
import Phase3 from './pages/Phase3';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/phase0" element={<Phase0 />} />
                <Route path="/phase1" element={<Phase1 />} />
                <Route path="/phase2" element={<Phase2 />} />
                <Route path="/phase3" element={<Phase3 />} />
            </Routes>
        </Router>
    );
}

export default App;
