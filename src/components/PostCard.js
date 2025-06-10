import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api';

const PostCard = ({ post, onPostEdit, onPostDelete }) => {
  const { user } = useContext(AuthContext);
  const [isLiking, setIsLiking] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);

  const isLiked = () => {
    if (!Array.isArray(currentPost.likes)) return false;
    const userId = user?.id || user?._id;
    if (!userId) return false;

    return currentPost.likes.some((like) => like?.toString() === userId.toString());
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${currentPost._id}`);
      if (onPostDelete) onPostDelete(currentPost._id); // pass ID
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleEdit = async () => {
    const newContent = prompt('Edit your post:', currentPost.content);
    if (!newContent || newContent === currentPost.content) return;

    try {
      const res = await api.put(`/posts/${currentPost._id}`, { content: newContent });
      setCurrentPost(res.data);
      if (onPostEdit) onPostEdit(res.data);
    } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const response = await api.toggleLikePost(currentPost._id);
      setCurrentPost(response.data);
      if (onPostEdit) onPostEdit(response.data);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isPostOwner = (user?.id || user?._id) === (currentPost.user._id || currentPost.user.id);

  return (
    <div className="card post-card">
      <div className="post-header">
        <div className="post-user">
          <Link to={`/profile/${currentPost.user._id || currentPost.user.id}`}>
          <h3>{currentPost.user.name}</h3>
          </Link>
        </div>
        <small>{formatDate(currentPost.createdAt)}</small>
      </div>
      <div className="post-content">
        <p>{currentPost.content}</p>
      </div>
      <div className="post-actions">
        <button
          className='like-button'
          onClick={handleLikeToggle}
          disabled={isLiking}
        >
          <i className={`fas fa-heart ${isLiked() ? 'liked' : ''}`}></i>
          <span className="like-count"> {currentPost.likes.length || 0}</span>
        </button>

        {isPostOwner && (
          <div className="post-owner-actions">
            <button className="edit-button" onClick={handleEdit}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
