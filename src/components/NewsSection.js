import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsSection = ({ title, selectedCategory }) => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setNews([]);
        setPage(0);
        setHasMore(true);
        if (selectedCategory) {
            fetchArticles(0); // Reset and fetch first page when category changes
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (page > 0) {
            fetchArticles(page);
        }
    }, [page]);

    const fetchArticles = (pageToFetch) => {
        setLoading(true);
        let url = `/api/articles/category?categoryCode=${selectedCategory.code}&page=${pageToFetch}&size=10`;

        axios.get(url)
            .then(response => {
                if (pageToFetch === 0) {
                    setNews(response.data.content);
                } else {
                    setNews(prevNews => [...prevNews, ...response.data.content]);
                }
                setHasMore(!response.data.last);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching articles: " + error);
                setLoading(false);
            });
    };

    const loadMoreArticles = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleArticleClick = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <section>
            <h2>{title}</h2>
            <div className="news-grid">
                {news.map((article, index) => (
                    <div
                        key={index}
                        className="news-item"
                        onClick={() => handleArticleClick(article.id)}
                    >
                        <img src={article.imgUrl} alt={article.headline} />
                        <div className="news-text">
                            <h3>{article.headline}</h3>
                            <p>{article.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
            {loading && (
                <div className="skeleton-container">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="skeleton">
                            <div className="skeleton-headline"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    ))}
                </div>
            )}
            {hasMore && !loading && (
                <div className="load-more-container">
                    <button onClick={loadMoreArticles} className="load-more-button">더 보기</button>
                </div>
            )}
        </section>
    );
};

export default NewsSection;
