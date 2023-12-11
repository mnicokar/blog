const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/postController');

router.route('/').post(upload.single('image'), createBlogPost);
router.route('/').get(getBlogPosts).post(createBlogPost);

router.route('/:postId').get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost);


module.exports = router;