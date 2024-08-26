import React, { useState, useEffect } from 'react';
import axiosClient from '@src/utils/axiosHelper';
import Cookies from "js-cookie";
import { format } from 'date-fns';
import Replies from "./Replies";

const Comments = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [userId, setUserID] = useState(Cookies.get('userId'));

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const fetchComments = (page) => {
        setLoading(true)

        axiosClient.get(`/api/articles/${articleId}/comments`, {
            params: {
                page: page,
                size: 10
            }
        })
            .then(response => {
                if (page === 0) {
                    setComments(response.data.content)
                } else {
                    setComments(prevComments => [...prevComments, ...response.data.content])
                }

                setHasMore(!response.data.last)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error fetching comments: " + error);
                setLoading(false)
            });
    };

    const handleLoadMoreComments = () => {
        setPage(prevPage => prevPage + 1)
    };

    const handleAddComment = () => {
        if (!userId || userId === "undefined") {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }

        if (newComment.trim()) {
            axiosClient.post(`/api/articles/comment`, { articleId: articleId, userId: userId, comment: newComment })
                .then(response => {
                    fetchComments(page);
                    setNewComment('');
                })
                .catch(error => console.log("Error adding comment: " + error));
        }
    };

    return (
        <div className="comments-section">
            <h5>댓글</h5>
            <div className="add-comment">
                <textarea
                    readOnly={!userId}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={userId ? '댓글을 입력해주세요.' : '로그인 후 이용해주세요'}
                ></textarea>
                <button onClick={handleAddComment} className="mb-3">등록</button>
            </div>
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <small>{comment.user.userId} | {format(new Date(comment ? comment.createdAt : ''), 'yyyy.MM.dd HH:mm')}</small>
                    <p>{comment.comment}</p>
                    <Replies commentId={comment.id} />
                </div>
            ))}
            {hasMore && !loading && (
                <div className="load-more-container">
                    <button onClick={handleLoadMoreComments} className="load-more-comments">더보기</button>
                </div>
            )}
        </div>
    );
};

export default Comments;