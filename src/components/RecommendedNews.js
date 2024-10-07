import React from 'react';

const RecommendedNews = ({ news = [] }) => {
    return (
        <section>
            <h2>Recommended News</h2>
            <div className="news-grid">
                {news.map((article, index) => (
                    <div key={index} className="news-item">
                        <img src={article.imgUrl} alt={article.headline} />
                        <div className="news-text">
                            <h3>{article.headline}</h3>
                            <p>{article.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedNews;
