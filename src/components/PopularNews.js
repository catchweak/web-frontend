import React from 'react';

const PopularNews = ({ news }) => {
    return (
        <div className="popular-news">
            <h2>Popular News</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularNews;
