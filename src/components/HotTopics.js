import React, { useState, useEffect } from 'react';
import axiosClient from '@src/utils/axiosHelper';
import CatchBarChart from "./HotTopicChart";
import {useNavigate} from "react-router-dom";

const HotTopics = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(0); // 페이지 상태 추가
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        if (page > 0) {
            fetchArticles(page, selectedTopic);
        }
    }, [page, selectedTopic]);

    const fetchArticles = (pageToFetch, topic) => {
        setLoading(true);
        axiosClient.get(`/search-by-keyword?&page=${pageToFetch}&size=12`, { params: { keyword: topic } })
            .then((response) => {
                if (pageToFetch === 0) {
                    setNews(response.data);
                } else {
                    setNews(prevNews => [...prevNews, ...response.data]);
                }
                if(response.data.length < 12){
                    setHasMore(false)
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching news: ", error);
                setNews([]);
                setLoading(false);
            });
    };

    // 토픽 클릭 이벤트 핸들러
    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        setPage(0)
        setHasMore(true)
        fetchArticles(page, topic)
    };

    const handleArticleClick = (id) => {
        navigate(`/news/${id}`);
    };

    const loadMoreArticles = () => {
        setPage(prevPage => prevPage + 1);
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
            {hasMore && !loading && (
                <div className="load-more-container">
                    <button onClick={loadMoreArticles}>더보기</button>
                </div>
            )}
            {loading && <p>Loading...</p>} {/* 로딩 중 표시 */}
        </div>
    );
};

export default HotTopics;
