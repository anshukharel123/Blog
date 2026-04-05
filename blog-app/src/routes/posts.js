const express = require('express');
const pool = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// GET ALL POSTS (everyone can see)
router.get('/', async (req, res) => {
  try {
    const posts = await pool.query(
      'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
    );
    res.json(posts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET SINGLE POST
router.get('/:id', async (req, res) => {
  try {
    const post = await pool.query(
      'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1',
      [req.params.id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE POST (logged in users only)
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, req.user.id]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE POST (only owner can edit)
router.put('/:id', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if post exists and belongs to user
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const updatedPost = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, req.params.id]
    );

    res.json(updatedPost.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE POST (owner or admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Allow if owner or admin
    if (post.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;