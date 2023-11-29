const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');

//where & how to store images on server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  BlogPost.find({})
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).send({ error: 'Error fetching blog posts' });
    });
});

router.post('/', upload.single('image'), (req, res) => {
  console.log('Request Body:', req.body);
  const { title, content, date } = req.body;

  const imagePath = req.body.file ? `/uploads/${req.file.filename}` : null;

  const newPost = new BlogPost({
    title,
    content,
    date,
    image: imagePath,
  });

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => {
      console.error('Error saving post:', err);
      res
        .status(500)
        .json({ error: `Error creating a blog post: ${err.message}` });
    });
});

router.put('/posts/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      { title: title, date: date },
      { content, image: imagePath },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating blog post:', err);
    res.status(500).json({ error: 'Error updating blog post' });
  }
});

router.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = BlogPost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;