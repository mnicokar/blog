require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { post } = require('./routes/posts');
const BlogPost = require('./models/BlogPost');
const PORT = process.env.PORT || 3001;

connectDB();
 
const app = express();
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/', require('./routes/posts'));
app.use('/:id', require('./routes/posts'));

app.get('/', async (req, res) => {
  const posts = await BlogPost.find({});
  res.send(posts);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});