import React from 'react';

const RecommendedNews = ({ news }) => {
    return (
        <div className="recommended-news">
            <h2>Recommended News</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendedNews;
