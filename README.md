# Blog

A sophisticated full-stack blogging platform designed for seamless content creation and management. This project features a robust role-based access control system, allowing users to share their stories while providing administrators with powerful moderation tools.

## 🔗 Live Demo
Experience the platform here: [blog-production-f4e2.up.railway.app](https://blog-production-f4e2.up.railway.app)

---

## 🛠 Technical Architecture

### Backend
Powered by **Node.js** and **Express**, providing a high-performance API layer.
- **Database:** PostgreSQL for reliable, relational data storage.
- **Security:** bcryptjs for password hashing and JWT for stateless authentication.

### Frontend
A clean, responsive interface built with **React** and **Tailwind CSS**, prioritizing readability and user experience.
- **Typography:** Features the elegant **Playfair Display** serif font for headings, paired with a clean sans-serif for body text.

---

## ✨ Key Features

- **Secure Authentication:** User registration and login with industry-standard password hashing.
- **JWT-Based Sessions:** Secure, token-based access for all protected resources.
- **Role-Based Access Control (RBAC):**
  - **User:** Create, view, edit, and delete personal posts.
  - **Admin:** Full moderation power—delete any post, manage user roles, and view the user directory.
- **Responsive Design:** Optimized for all devices, from mobile phones to desktop monitors.

---

## 🔐 Security & Authentication

### Password Protection
We never store plain-text passwords. Every password is salted and hashed using **bcryptjs** before it ever touches the database.

### Authorization Flow
Upon successful login, the server issues a **JSON Web Token (JWT)**. This token is stored securely in the browser and sent with every protected request. The backend verifies the token and the user's role before processing any sensitive operations.

---

## 📡 API Reference

### Authentication
- `POST /api/auth/register` — Create a new account.
- `POST /api/auth/login` — Authenticate and retrieve a session token.

### Content Management
- `GET /api/posts` — Retrieve all public posts.
- `GET /api/posts/:id` — View a specific post.
- `POST /api/posts` — Create a new post (Requires Login).
- `PUT /api/posts/:id` — Update a post (Owner Only).
- `DELETE /api/posts/:id` — Remove a post (Owner or Admin).

### Administration
- `GET /api/admin/users` — List all registered users (Admin Only).
- `DELETE /api/admin/posts/:id` — Moderate/Delete any post (Admin Only).
- `PUT /api/admin/users/:id/role` — Update user permissions (Admin Only).
