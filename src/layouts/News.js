import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import HotTopics from '../components/HotTopics';
import NewsSection from '../components/NewsSection';
import RecommendedNews from '../components/RecommendedNews';
import PopularNews from '../components/PopularNews';
import Events from '../components/Events';
import axiosClient from "@src/utils/axiosHelper";

const News = () => {
    const { currentCategory } = useOutletContext();
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axiosClient.get('/api/articles/headlines')
    //         .then(response => {
    //             setHeadlines(response.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.log("Error fetching headlines: " + error);
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <div className="content-container">
            {/*{loading ? (*/}
            {/*    <div className="headline-banner">*/}
            {/*        {[...Array(3)].map((_, index) => (*/}
            {/*            <div key={index} className="headline-item skeleton">*/}
            {/*                <div className="skeleton-headline"></div>*/}
            {/*                <div className="skeleton-text"></div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <div className="headline-banner">*/}
            {/*        {headlines.map((item, index) => (*/}
            {/*            <div key={index} className="headline-item">*/}
            {/*                <img src={item.imgUrl} alt={item.headline} />*/}
            {/*                <div className="headline-text">*/}
            {/*                    <h2>{item.headline}</h2>*/}
            {/*                    <p>{item.summary}</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="section">
                <HotTopics />
            </div>
            <div className="section">
                {currentCategory && (
                    <NewsSection key={currentCategory.code} title={currentCategory.name} selectedCategory={currentCategory} />
                )}
            </div>
            <div className="section">
                <RecommendedNews news={[]} />
            </div>
            <div className="section">
                <PopularNews news={[]} />
            </div>
            <div className="section">
                <Events />
            </div>
        </div>
    );
};

export default News;
