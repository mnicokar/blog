const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  upload
} = require('../controllers/postController');

router.route('/').post(upload.single('image'), createBlogPost);
router.route('/').get(getBlogPosts).post(createBlogPost);

// mobin test
router.get("/:id",getBlogPost)


//router.route('/:postId').get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost);


module.exports = router;