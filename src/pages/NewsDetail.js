import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`/api/articles/${id}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the news article!", error);
            });
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-detail-page">
            <h1>{article.title}</h1>
            <img src={article.imageUrl} alt={article.title} />
            <p>{article.content}</p>
        </div>
    );
};

export default NewsDetail;
