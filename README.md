# Blog

A sophisticated full-stack blogging platform designed for seamless content creation and management. This project features a robust role-based access control system, allowing users to share their stories while providing administrators with powerful moderation tools.

## 🔗 Live Demo
Experience the platform here: [blog-production-f4e2.up.railway.app](https://blog-production-f4e2.up.railway.app)


## 🛠 Technical Architecture

- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Authentication:** JWT + bcryptjs
- **Frontend:** HTML, CSS, Vanilla JavaScript

## ✨ Key Features

- User registration and login with hashed passwords
- JWT-based authentication
- Role-based access control (Admin and User)
- Create, edit, and delete your own posts
- Admins can delete any post and view all users
- Clean responsive UI with Playfair Display font


## 🔐 Security & Authentication


## How Authentication Works

When a user registers, their password is hashed using bcryptjs before 
being stored in the database - so plain passwords are never saved.

When they login, a JWT token is generated and stored in the browser. 
Every protected request sends this token in the Authorization header, 
and the server verifies it before allowing access.

## Role-Based Access

 User  - Create, view, edit and delete their own posts.
 Admin - Everything a user can do, plus delete any post and view all users.

## 📡 API Reference

### Authentication
- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate and retrieve a session token.

### Content Management

- `GET /api/posts` - Retrieve all public posts.
- `GET /api/posts/:id` - View a specific post.
- `POST /api/posts` - Create a new post (Requires Login).
- `PUT /api/posts/:id` - Update a post (Owner Only).
- `DELETE /api/posts/:id` - Remove a post (Owner or Admin).

### Administration
- `GET /api/admin/users` - List all registered users (Admin Only).
- `DELETE /api/admin/posts/:id` - Moderate/Delete any post (Admin Only).
- `PUT /api/admin/users/:id/role` - Update user permissions (Admin Only).
