import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news/:id" element={<NewsDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
