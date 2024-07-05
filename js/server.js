const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (pastikan MongoDB sudah berjalan di komputer Anda)
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema untuk komentar
const commentSchema = new mongoose.Schema({
  text: String,
  author: String
});

// Model untuk komentar
const Comment = mongoose.model('Comment', commentSchema);

// Endpoint untuk mendapatkan semua komentar
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving comments');
    } else {
      res.json(comments);
    }
  });
});

// Endpoint untuk menambah komentar baru
app.post('/comments', (req, res) => {
  const { text, author } = req.body;

  const newComment = new Comment({
    text: text,
    author: author
  });

  newComment.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding comment');
    } else {
      res.status(201).json(newComment);
    }
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
