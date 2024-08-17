import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from "@src/utils/axiosHelper";
import Cookies from 'js-cookie';
import numberFormatter from '../utils/numberFormatter';

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeTimer, setTimer] = useState(null);

    const { formatKMB_KOR } = numberFormatter();

    const renderBodyWithImages = (body) => {
        const imageTagRegex = /<catch-weak-img>(.*?)<\/catch-weak-img>/g;
        const parts = [];
        let match;
        let lastIndex = 0;

        while ((match = imageTagRegex.exec(body)) !== null) {
            try {
                // 텍스트 부분 추가
                if (match.index > lastIndex) {
                    parts.push(body.substring(lastIndex, match.index));
                }
                lastIndex = imageTagRegex.lastIndex;

                // 이미지 속성 추출
                const content = match[1];
                const properties = content.split('|');

                // 이미지 속성 파싱
                const imgSrc = properties[0] ? properties[0].replace("src=", "") : '';
                const imgAlt = properties[1] ? properties[1].replace("alt=", "") : '';

                parts.push(
                    <div key={`img-${lastIndex}`} className="image-container">
                        <img src={imgSrc} alt={imgAlt} className="news-image"/>
                        <div className="img-caption mb-md-3">{imgAlt}</div>
                    </div>
                );
            } catch (error) {
                console.error('Error processing image tag:', error);
                // 오류 발생 시 기본값 처리
                parts.push(match[0]);
            }
        }

        // 마지막 텍스트 부분 추가
        if (lastIndex < body.length) {
            parts.push(body.substring(lastIndex));
        }

        return parts.map((part, index) => {
            if (typeof part === 'string') {
                return part.split('\n').map((text, i) => <p key={`${index}-${i}`}>{text}</p>);
            }
            return part;
        });
    }

    useEffect(() => {
        axiosClient.get(`/api/articles/${id}`)
            .then(response => {
                setArticle(response.data);
                setLoading(false);

                checkLikeStatus();

                // 10초 이상 머물렀을 때 조회수 증가 요청
                const timer = setTimeout(() => {
                    updateViewCount();
                }, 10000); // 10,000 milliseconds = 10 seconds

                return () => clearTimeout(timer); // Cleanup timeout on component unmount

            })
            .catch(error => {
                console.log("Error fetching article: " + error);
                setLoading(false);
            });
    }, [id]);

    // 조회수 증가 요청
    const updateViewCount = () => {
        const viewedArticles = JSON.parse(Cookies.get('viewedArticleTime') || '{}');

        // 현재 시간을 초 단위로 저장
        const currentTime = Math.floor(Date.now() / 1000);

        // 12시간(43200초) 동안 조회수를 중복으로 올리지 않도록 설정
        const viewExpiration = 43200;

        if (!viewedArticles[id] || currentTime - viewedArticles[id] > viewExpiration) {
            // API 호출하여 조회수 업데이트
            axiosClient.post(`/api/articles/${id}/views`)
                .then(response => {
                    // 쿠키에 조회 기록 업데이트
                    viewedArticles[id] = currentTime;
                    Cookies.set('viewedArticleTime', JSON.stringify(viewedArticles), { expires: 1 });
                })
                .catch(error => {
                    console.log("Error updating view count: " + error);
                });
        }
    };

    const checkLikeStatus = () => {
        const userId = Cookies.get('userId');

        axiosClient.get(`/api/articles/${id}/like-status`, { params: { userId: userId } })
            .then(response => {
                setLikeStatus(response.data);
            })
            .catch(error => {
                console.log("Error checkLikeStatus: " + error);
            });
    };

    const handleLike = () => {
        const userId = Cookies.get('userId');

        if (!userId || userId === "undefined") {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }

        setLikeStatus(!likeStatus);

        // 2초 안에 버튼 클릭 시 API 요청 안함
        if (likeTimer) {
            clearTimeout(likeTimer);
            setTimer(null);
            return
        }

        const newTimer = setTimeout(() => {
            axiosClient.post(`/api/articles/${id}/like`, { userId })
                .then(() => {
                    setArticle(prev => ({
                        ...prev,
                        likeCount: (likeStatus) ? prev.likeCount - 1 : prev.likeCount + 1
                    }));
                })
                .catch(error => {
                    console.log("Error handleLike API call: ", error);
                    // 서버와 동기화 실패 시, 상태를 원래대로 돌림
                    setLikeStatus(prev => !prev);
                })
                .finally(() => {
                    setTimer(null);
                })
        }, 2000);

        setTimer(newTimer);
    };

    const handleShare = () => {
        const userId = Cookies.get('userId');

        if (!userId || userId === "undefined") {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }

        const shareUrl = window.location.href;

        // 클립보드에 URL 복사
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("뉴스 링크가 클립보드에 복사되었습니다.")

            // 뉴스 공유 API 호출
            axiosClient.post(`/api/articles/${id}/share`, { userId })
                .then(() => {
                })
                .catch(error => {
                    console.log("Error sharing article: " + error);
                });

        }).catch((error) => {
            console.error("Error URL to clipboard:", error);
        });
    };

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
            <div className="news-body">
                {renderBodyWithImages(article.body)}
            </div>
            <div className="news-category">
                <p>기사원문: <a href={article.originUrl} target="_blank"
                            rel="noopener noreferrer">{article.originUrl}</a></p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="like-button-container">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleLike}>
                        <i className={likeStatus ? "bi bi-star-fill" : "bi bi-star"}></i>
                        <span className="m-2">{formatKMB_KOR(article.likeCount)}</span>
                    </button>
                </div>
                <div className="share-button-container ms-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleShare}>
                        <i className="bi bi-share-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
