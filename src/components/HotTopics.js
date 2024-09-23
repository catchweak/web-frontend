import React, { useState, useEffect } from 'react';
import axiosClient from '@src/utils/axiosHelper';
import CatchBarChart from "./HotTopicChart";
import {useNavigate} from "react-router-dom";

const HotTopics = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    // 토픽 클릭 이벤트 핸들러
    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        axiosClient.get(`/search-by-keyword`, { params: { keyword: topic } })
            .then((response) => {
                setNews(response.data);
            })
            .catch((error) => {
                console.log("Error fetching news: ", error);
                setNews([]);
            });
    };

    const handleArticleClick = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <div className="hot-topic-container">
            <h2>Hot 캐치</h2>
            <div className="chart-container mb-5">
                <CatchBarChart onTopicSelect={handleTopicSelect} />
            </div>
            {selectedTopic && (
                <div className="news-grid">
                    {news.map((article, index) => (
                        <div
                            key={index}
                            className="news-item"
                            onClick={() => handleArticleClick(article.id)}
                        >
                            <img src={article.imgUrl} alt={article.headline}/>
                            <div className="news-text">
                                <h3>{article.headline}</h3>
                                <p>{article.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotTopics;
