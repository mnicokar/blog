const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/BlogPost");
const multer = require('multer');

//  Fetch all posts
const getBlogPosts = asyncHandler(async (req, res) => {
    const posts = await BlogPost.find({});
    res.status(200).json(posts);
});

// Fetch a single post
const getBlogPost = asyncHandler(async (req, res) => {
    const postID = req.params.id;
    console.log("id:", postID);
    const post = await BlogPost.findById(postID);
    if (!post) {
        res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
});

// Create a new post
const createBlogPost = asyncHandler(async (req, res) => {
    const { title, date, content } = req.body;
    const imageUrl = req.file.path;
    console.log("Title:", title);
    console.log("Date:", date);
    console.log("Content:", content);
    console.log("ImageUrl:", imageUrl);
    const post = await BlogPost.create({ title, date, content, imageUrl });
    res.status(200).json(post);
});

// Update a post
const updateBlogPost = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    const post = await BlogPost.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!post) {
        res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedBlogPost);
});

// Delete a post
const deleteBlogPost = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    const post = await BlogPost.findByIdAndDelete(_id);
    if (!post) {
        res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
});

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

module.exports = { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost, upload };