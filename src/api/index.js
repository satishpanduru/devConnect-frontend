import axios from 'axios';

// Create axios instance
console.log("API Base URL:", process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

// Automatically attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Auth endpoints
api.register = (userData) => api.post('/auth/register', userData);

api.login = (credentials) => api.post('/auth/login', credentials);

api.getCurrentUser = () => api.get('/auth/me');

//User endpoints
api.getAllUsers = () => api.get('/users');

api.updateProfile = (profileData) => api.put('/users/profile', profileData);

//Post endpoints
api.getPosts = () => api.get('/posts');

api.createPost = (postData) => api.post('/posts', postData);

api.updatePost = (postId, updatedData) => api.put(`/posts/${postId}`, updatedData);

api.deletePost = (postId) => api.delete(`/posts/${postId}`);

api.likePost = (postId) => api.put(`/posts/${postId}/like`);

api.unlikePost = (postId) => api.put(`/posts/${postId}/unlike`);

api.toggleLikePost = (postId) => api.put(`/posts/${postId}/toggle-like`);

api.getUserById = (id) => api.get(`/users/${id}`);

export default api;
