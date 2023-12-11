const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { 
    type: String,
    required: true,
    default: () => new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    }),
  },
  imageUrl: { type: String },
  content: { type: String },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

