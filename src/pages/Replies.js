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
    const [isOpen, setIsOpen] = useState(false);
    const [replyCount, setReplyCount] = useState(0)
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

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
                    setReplies(response.data.replies.content)
                    setReplyCount(response.data.count)
                } else {
                    setReplies(prevReplies => [...prevReplies, ...response.data.replies.content])
                }

                setHasMore(!response.data.replies.last)
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
                .then(response => {
                    setReplies(prevReplies => [...prevReplies, response.data]);
                    setReplyText('');
                    setReplyCount(prevCount => prevCount + 1);
                })
                .catch(error => console.log("Error adding reply: " + error));
        }
    };

    const handleEditReply = (replyId, currentText) => {
        setEditReplyId(replyId);
        setEditReplyText(currentText);
    };

    const handleSaveEdit = (replyId) => {
        if (editReplyText.trim()) {
            axiosClient.put(`/api/articles/comment/reply`, { userId: userId, replyId: replyId, comment: editReplyText })
                .then(() => {
                    setReplies(prevReplies => prevReplies.map(reply =>
                        reply.id === replyId ? { ...reply, comment: editReplyText, updated: true } : reply
                    ));
                    setEditReplyId(null);
                    setEditReplyText('');
                })
                .catch(error => console.log("Error editing reply: " + error));
        }
    };

    const handleDeleteReply = (replyId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axiosClient.put(`/api/articles/comment/reply/delete`, { userId: userId, replyId: replyId, comment: '' })
                .then(() => {
                    setReplies(prevReplies => prevReplies.filter(reply => reply.id !== replyId));
                    setReplyCount(prevCount => prevCount - 1);
                })
                .catch(error => console.log("Error deleting reply: " + error));
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
                답글 {replyCount} {isOpen ? "▲" : "▼"}
            </div>
            {isOpen && (
                <>
                    {replies.map(reply => (
                        <div key={reply.id} className="comment-reply">
                            <small>{reply.user.userId} | {format(new Date(reply ? reply.createdAt : ''), 'yyyy.MM.dd HH:mm')} {reply.updated ? '(수정됨)' : ''}</small>
                            {editReplyId === reply.id ? (
                                <div>
                                    <textarea
                                        value={editReplyText}
                                        onChange={(e) => setEditReplyText(e.target.value)}
                                        className="edit-comment-textarea"
                                    ></textarea>
                                    <div className="comment-actions">
                                        <span onClick={() => handleSaveEdit(reply.id)} className="comment-action save-edit-btn">저장</span>
                                        <span onClick={() => setEditReplyId(null)} className="comment-action cancel-edit-btn">취소</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {reply.user.userId === userId && (
                                        <div className="comment-actions">
                                            <span onClick={() => handleEditReply(reply.id, reply.comment)} className="comment-action">수정 </span>
                                            <span onClick={() => handleDeleteReply(reply.id)} className="comment-action">삭제</span>
                                        </div>
                                    )}
                                    <p>{reply.comment}</p>
                                </>
                            )}
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
