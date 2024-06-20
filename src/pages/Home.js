import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HotTopics from '../components/HotTopics';
import NewsSection from '../components/NewsSection';
import RecommendedNews from '../components/RecommendedNews';
import PopularNews from '../components/PopularNews';
import Events from '../components/Events';
import Footer from '../components/Footer';
import axios from 'axios';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error fetching categories: " + error));

        axios.get('/api/articles/headlines')
            .then(response => {
                setHeadlines(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching headlines: " + error);
                setLoading(false);
            });
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <Header categories={categories} onCategorySelect={handleCategorySelect} />
            <div className="header-spacing"></div> {/* 헤더 아래 공간 확보 */}
            <div className="main-content">
                <div className="content-container">
                    {loading ? (
                        <div className="headline-banner">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="headline-item skeleton">
                                    <div className="skeleton-headline"></div>
                                    <div className="skeleton-text"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="headline-banner">
                            {headlines.map((item, index) => (
                                <div key={index} className="headline-item">
                                    <img src={item.imgUrl} alt={item.headline} />
                                    <div className="headline-text">
                                        <h2>{item.headline}</h2>
                                        <p>{item.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="section">
                        <HotTopics />
                    </div>
                    <div className="section">
                        {selectedCategory && (
                            <NewsSection key={selectedCategory.code} title={selectedCategory.name} selectedCategory={selectedCategory} />
                        )}
                    </div>
                    <div className="section">
                        <RecommendedNews news={[]} />
                    </div>
                    <div className="section">
                        <PopularNews news={[]} />
                    </div>
                    <div className="section">
                        <Events />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
