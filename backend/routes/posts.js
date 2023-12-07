const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/postController');

router.route('/').get(getBlogPosts).post(createBlogPost);

router.route('/:id').get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost);

module.exports = router;