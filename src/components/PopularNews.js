import React, {useEffect, useState} from 'react';
import axiosClient from "@src/utils/axiosHelper";
import { useNavigate } from 'react-router-dom';

const PopularNews = () => {
    // ****************     init values      **************** //
    const [popularNews, setPopularNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ****************     loading(rendering) hook      **************** //
    // fetch popular news
    useEffect(() => {
        axiosClient.get('/api/articles/popular')
            .then(response => {
                setPopularNews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching headlines: " + error);
                setLoading(false);
            });
    }, []);

    // ****************     component event handler      **************** //
    const handleArticleClick = (id) => {
        navigate(`/news/${id}`);
    };

    // ****************     UI      **************** //
    return (
        <div className="popular-news">
            <h2>인기 캐치</h2>
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
                    {popularNews.map((article, index) => (
                        <div key={index} className="headline-item" onClick={() => handleArticleClick(article.id)}>
                            <img src={article.imgUrl} alt={article.headline}/>
                            <div className="headline-text">
                                <h2>{article.headline}</h2>
                                <p>{article.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularNews;
