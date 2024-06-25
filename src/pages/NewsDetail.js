import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/articles/${id}`)
            .then(response => {
                setArticle(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching article: " + error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="news-detail">
            <h1>{article.headline}</h1>
            <div className="news-meta">
                <span>{article.author}</span> | <span>{article.articleCreatedAt}</span>
            </div>
            <blockquote className="news-summary">{article.summary}</blockquote>
            <img src={article.imgUrl} alt={article.headline} className="news-image"/>
            <div className="news-body">
                {article.body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="news-category">
                <p>기사원문: <a href={article.originUrl} target="_blank"
                            rel="noopener noreferrer">{article.originUrl}</a></p>
            </div>
        </div>
    );
};

export default NewsDetail;
