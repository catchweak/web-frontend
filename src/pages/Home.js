import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from "@src/utils/axiosHelper";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const location = useLocation();

    useEffect(() => {
        axiosClient.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.log("Error fetching categories: " + error));
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith("/category/")) {
            const categoryCode = location.pathname.split("/category/")[1];
            const selectedCategory = categories.find(category => category.code === categoryCode);
            if (selectedCategory) {
                setCurrentCategory(selectedCategory);
            }
        }
    }, [location, categories]);

    const handleCategorySelect = (category) => {
        setCurrentCategory(category);
    };

    return (
        <div>
            <Header topCategories={categories} onTopCategorySelect={handleCategorySelect} />
            <div className="main-content">
                <Outlet context={{ currentCategory }} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
