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
    const [news, setNews] = useState([]);
    const [headlines, setHeadlines] = useState([]);

    useEffect(() => {
        // 카테고리 가져오기
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error fetching categories: " + error));

        // 전체 뉴스 기사 가져오기
        axios.get('/api/articles')
            .then(response => setNews(response.data))
            .catch(error => console.log("Error fetching articles: " + error));

        // 헤드라인 뉴스 가져오기
        axios.get('/api/articles/headlines')
            .then(response => setHeadlines(response.data))
            .catch(error => console.log("Error fetching headlines: " + error));
    }, []);

    const filteredNews = selectedCategory ? news.filter(article => article.category.code === selectedCategory.code) : [];

    return (
        <div>
            <Header categories={categories} onCategorySelect={setSelectedCategory} />
            <div className="main-content">
                <div className="content-container">
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
                    <div className="section">
                        <HotTopics />
                    </div>
                    <div className="section">
                        {selectedCategory && (
                            <NewsSection title={selectedCategory.name} news={filteredNews} />
                        )}
                    </div>
                    <div className="section">
                        <RecommendedNews news={filteredNews} />
                    </div>
                    <div className="section">
                        <PopularNews news={filteredNews} />
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
