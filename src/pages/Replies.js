import React, { useState, useEffect } from 'react';
import axiosClient from '@src/utils/axiosHelper';
import Cookies from "js-cookie";
import { format } from 'date-fns';

const Replies = ({ commentId }) => {
    const [replies, setReplies] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [userId, setUserID] = useState(Cookies.get('userId'));
    const [isOpen, setIsOpen] = useState(false); // t

    useEffect(() => {
        fetchReplies(page);
    }, [page]);

    const fetchReplies = (page) => {
        setLoading(true)
        axiosClient.get(`/api/articles/${commentId}/replies`, {
            params: {
                page: page,
                size: 5
            }
        })
            .then(response => {
                if (page === 0) {
                    setReplies(response.data.content)
                } else {
                    setReplies(prevReplies => [...prevReplies, ...response.data.content])
                }

                setHasMore(!response.data.last)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error fetching replies: " + error);
                setLoading(false)
            });
    };

    const handleAddReply = () => {
        if (!userId || userId === "undefined") {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }

        if (replyText.trim()) {
            axiosClient.post(`/api/articles/comment/reply`, { userId: userId, parentCommentId: commentId, comment: replyText })
                .then(() => {
                    fetchReplies(page);
                    setReplyText('');
                })
                .catch(error => console.log("Error adding reply: " + error));
        }
    };

    const handleLoadMoreReplies = () => {
        setPage(prevPage => prevPage + 1)
    };

    const toggleReply = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="replies-section">
            <div className="reply-toggle" onClick={toggleReply}>
                답글 {replies ? replies.length : 0} {isOpen ? "▲" : "▼"}
            </div>
            {isOpen && (
                <>
                    {replies.map(reply => (
                        <div key={reply.id} className="comment-reply">
                            <small>{reply.user.userId} | {format(new Date(reply ? reply.createdAt : ''), 'yyyy.MM.dd HH:mm')}</small>
                            <p>{reply.comment}</p>
                        </div>
                    ))}
                    {loading && (
                        <div className="skeleton-container">
                            {[...Array(replies.length)].map((_, index) => (
                                <div key={index} className="skeleton">
                                    <div className="skeleton-text"></div>
                                </div>
                            ))}
                        </div>
                    )}
                    {hasMore && !loading && (
                        <div className="load-more-container">
                            <button onClick={handleLoadMoreReplies} className="load-more-replies">더보기</button>
                        </div>
                    )}
                    <div className="add-comment">
                        <textarea
                            readOnly={!userId}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={userId ? '답글을 입력해주세요.' : '로그인 후 이용해주세요'}
                        ></textarea>
                        <button onClick={handleAddReply} className="mb-3">답글 등록</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Replies;
