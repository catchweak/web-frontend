import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from "../utils/axiosHelper";

const NewsDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const renderBodyWithImages = (body) => {
        const imageTagRegex = /<catch-weak-img>(.*?)<\/catch-weak-img>/g;
        const parts = [];
        let match;
        let lastIndex = 0;

        //body = "<catch-weak-img>src=https://imgnews.pstatic.net/image/025/2024/06/11/0003366150_002_20240611174108724.jpg?type=w647|alt=모델로 깜짝 데뷔한 블랙핑크 제니. 사진 유튜브 \'FF Channel\' 캡처|</catch-weak-img>그룹 블랙핑크 제니가 런웨이에 오르며 모델로 깜짝 데뷔했다.10일(현지시간) 이탈리아 카프리섬에서는 프랑스 디자이너브랜드 자크뮈스의 15주년 기념 컬렉션 \'라 카사\'(LA CASA) 쇼가 진행됐다.이 무대의 마지막을 장식하는 모델로 제니가 등장해 눈길을 끌었다.<catch-weak-img>src=https://imgnews.pstatic.net/image/025/2024/06/11/0003366150_001_20240611174108688.jpg?type=w647|alt=모델로 깜짝 데뷔한 블랙핑크 제니. 사진 유튜브 \'FF Channel\' 캡처|</catch-weak-img>등과 옆 가슴 라인이 드러나는 검정색 홀터넥 드레스를 입고 등장한 제니는 왼손에 민트색 가방을 든 채 우아한 워킹을 선보였다.쇼 중반엔 제니의 절친이자 톱모델 신현지가 제니를 스쳐 지나가면서 손을 살짝 잡아 응원해주는 모습이 카메라에 담기기도 했다.<catch-weak-img>src=https://imgnews.pstatic.net/image/025/2024/06/11/0003366150_003_20240611174108746.jpg?type=w647|alt=\'제니 손 잡아주는 신현지. 사진 온라인 커뮤니티 캡처|</catch-weak-img>런웨이 데뷔를 성공적으로 마친 제니는 디자이너 자크뮈스와 뜨겁게 포옹했다.앞서 자크뮈스는 인스타그램에 \"쇼 24시간 전\"이라며 강렬한 오렌지색 수건을 두른 제니의 사진을 공개하기도 했다. 제니는 지난 2022년 하와이에서 열린 자크뮈스 컬렉션에 참석하는 등 우정을 나눠왔다.<catch-weak-img>src=https://imgnews.pstatic.net/image/025/2024/06/11/0003366150_004_20240611174108777.jpg?type=w647|alt=\'자크뮈스가 쇼 24시간 전 올린 사진. 사진 자크뮈스 인스타그램 캡처|</catch-weak-img>한편 제니는 1인 기획사 오드 아틀리에를 설립하고 솔로 앨범을 준비 중이다. 최근에는 지코의 신곡 \'스팟\'의 피처링을 맡아 음원차트를 휩쓸었다.지난 5월엔 미국 뉴욕 메트로폴리탄 미술관에서 열린 2024 멧갈라에 파란색 미니드레스를 입고 참석해 세계 패션계의 주목을 받았다."

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
            <div className="news-body">
                {renderBodyWithImages(article.body)}
            </div>
            <div className="news-category">
                <p>기사원문: <a href={article.originUrl} target="_blank"
                            rel="noopener noreferrer">{article.originUrl}</a></p>
            </div>
        </div>
    );
};

export default NewsDetail;
