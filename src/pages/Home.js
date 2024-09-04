import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from "@src/utils/axiosHelper";

const Home = () => {
    // ****************     init values      **************** //
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();
    const navigate = useNavigate();

    // ****************     loading(rendering) hook      **************** //
    // fetch categories
    useEffect(() => {
        axiosClient.get('/api/categories')
            .then(response => {
                setCategories(response.data);

                const initCategory = response.data.find(category => category.code === response.data[0].code);
                setCurrentCategory(initCategory);
            })
            .catch(error => console.log("Error fetching categories: " + error));
    }, []);

    // ****************     component event handler      **************** //
    const handleCategorySelect = (category) => {
        setCurrentCategory(category);
        navigate(`/category/${category.code}`);
    };

    // ****************     UI      **************** //
    return (
        <div>
            <Header categories={categories} currentCategory={currentCategory} onCategorySelect={handleCategorySelect} />
            <div className="main-content">
                <Outlet context={{ currentCategory }} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
