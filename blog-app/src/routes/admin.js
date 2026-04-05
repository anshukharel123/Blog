const express = require('express');
const pool = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// GET ALL USERS (admin only)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await pool.query(
      'SELECT users.id, users.username, users.email, users.created_at, roles.name as role FROM users JOIN roles ON users.role_id = roles.id'
    );
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE ANY POST (admin only)
router.delete('/posts/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);

    if (post.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted by admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE USER ROLE (admin only)
router.put('/users/:id/role', verifyToken, verifyAdmin, async (req, res) => {
  const { role_id } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE users SET role_id = $1 WHERE id = $2 RETURNING id, username, email, role_id',
      [role_id, req.params.id]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User role updated', user: updatedUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;