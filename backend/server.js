require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db');
const { post } = require('./routes/posts');
const BlogPost = require('./models/BlogPost');
const PORT = process.env.PORT || 3001;
const upload = multer({ dest: 'uploads/' });

connectDB();
 
const app = express();
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/posts', require('./routes/posts'));
app.post('/', upload.single('image'), require('./routes/posts'));

app.get('/', async (req, res) => {
  const posts = await BlogPost.find({});
  console.log("welcome")
  res.send(posts);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});