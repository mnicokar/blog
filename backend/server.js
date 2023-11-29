const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const BlogPost = require('./models/BlogPost');

const app = express();
const port = process.env.PORT || 3500;
const DB_URI = 'mongodb+srv://gracejovanovic:gracie3@cluster0.elipkyo.mongodb.net/?retryWrites=true&w=majority';
const postsRoute = require('./routes/posts');

app.use((req, res, next) => {
  console.log('LOGGING MIDDLEWARE');
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

app.use((req, res, next) => {
  console.log ('BEFORE MIDDLEWARE')
  console.log(req.method, req.url);
  console.log ('AFTER MIDDLEWARE')
  next();
})

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid collisions
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Connect application to database
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => console.error('Database connection error:', error));

// Define routes
app.get('/posts/:id', (req, res) => {
  // Handle displaying a single blog post by ID
});

app.use((req, res) => {
  console.log('TEST MIDDLEWARE');
  res.end();
});

app.use((req, res, next) => {
  console.log('EARLY MIDDLEWARE');
  next();
});

app.use('/', postsRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});