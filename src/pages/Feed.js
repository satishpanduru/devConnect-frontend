import React, { useState, useEffect, useContext } from 'react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.getPosts();
      setPosts(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postContent.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.createPost({ content: postContent });
      setPosts(prev => [res.data, ...prev]);
      setPostContent('');
      setError(null);
    } catch (err) {
      console.error('Error creating post', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostEdit = (updatedPost) => {
    setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
  };

  const handlePostDelete = (deletedPostId) => {
    setPosts(prev => prev.filter(p => p._id !== deletedPostId));
  };

  return (
    <div className="feed-container">
      <div className="section-title">
        <h1>Developer Feed</h1>
        <p>Welcome to the community</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-header">
          <h3>Share an update</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                name="content"
                cols="30"
                rows="4"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              disabled={submitting || !postContent.trim()}
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>

      <div className="posts">
        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="card my-3">
                <div className="card-body text-center">
                  <p>No posts found.</p>
                  <p>Be the first one to share something!</p>
                </div>
              </div>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  onPostEdit={handlePostEdit}
                  onPostDelete={handlePostDelete}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
