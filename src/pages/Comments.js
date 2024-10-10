import React, {useState, useEffect, useCallback} from 'react';
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
    const [userId] = useState(Cookies.get('userId'));
    const [commentCount, setCommentCount] = useState(0)
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const fetchComments = useCallback(() => {
        setLoading(true)

        axiosClient.get(`/api/articles/${articleId}/comments`, {
            params: {
                page: page,
                size: 10
            }
        })
            .then(response => {
                if (page === 0) {
                    setComments(response.data.comments.content)
                    setCommentCount(response.data.count)
                } else {
                    setComments(prevComments => [...prevComments, ...response.data.comments.content])
                }

                setHasMore(!response.data.comments.last)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error fetching comments: " + error);
                setLoading(false)
            });
    }, [page, articleId]);

    useEffect(() => {
        fetchComments();
    }, [page, fetchComments]);

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
                    setComments(prevComments => [response.data, ...prevComments]);
                    setNewComment('');
                    setCommentCount(prevCount => prevCount + 1);
                })
                .catch(error => console.log("Error adding comment: " + error));
        }
    };

    const handleEditComment = (commentId, currentText) => {
        setEditCommentId(commentId);
        setEditCommentText(currentText);
    };

    const handleSaveEdit = (commentId) => {
        if (editCommentText.trim()) {
            axiosClient.put(`/api/articles/comment`, { userId: userId, commentId: commentId, comment: editCommentText })
                .then(() => {
                    setComments(prevComments => prevComments.map(comment =>
                        comment.id === commentId ? { ...comment, comment: editCommentText, updated: true } : comment
                    ));
                    setEditCommentId(null);
                    setEditCommentText('');
                })
                .catch(error => console.log("Error editing comment: " + error));
        }
    };

    const handleDeleteComment = (commentId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axiosClient.put(`/api/articles/comment/delete`, { userId: userId, commentId: commentId, comment: '' })
                .then(() => {
                    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
                    setCommentCount(prevCount => prevCount - 1);
                })
                .catch(error => console.log("Error deleting comment: " + error));
        }
    };

    return (
        <div className="comments-section">
            <h5>댓글 {commentCount}개</h5>
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
                    <small>{comment.user.userId} | {format(new Date(comment ? comment.createdAt : ''), 'yyyy.MM.dd HH:mm')} {comment.updated?'(수정됨)':''}</small>
                    {/*<p>{comment.comment}</p>*/}
                    {editCommentId === comment.id ? (
                        <div>
                            <textarea
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                className="edit-comment-textarea"
                            ></textarea>
                            <div className="comment-actions">
                                <span onClick={() => handleSaveEdit(comment.id)} className="comment-action save-edit-btn">저장</span>
                                <span onClick={() => setEditCommentId(null)} className="comment-action cancel-edit-btn">취소</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {comment.user.userId === userId && (
                                <div className="comment-actions">
                                    <span onClick={() => handleEditComment(comment.id, comment.comment)} className="comment-action">수정 </span>
                                    <span onClick={() => handleDeleteComment(comment.id)} className="comment-action">삭제</span>
                                </div>
                            )}
                            <p>{comment.comment}</p>
                        </>
                    )}
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