# devConnect – MERN Stack Developer Community Platform

A full-stack web application for developers to create profiles, showcase skills, and interact with others.

## 🚀 Features
- User Authentication (JWT + React Context)
- Edit Profile with bio, skills, location, GitHub URL
- Like Button UI toggle
- Protected Routes
- REST API (Node.js + Express)
- MongoDB with Mongoose

## 🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js, MongoDB, JWT
- Tools: dotenv, CORS, MVC architecture

## 🔗 Live Demo
https://dev-connect-frontend-five.vercel.app/

## 📁 Folder Structure
- `client/` – Frontend React app
client/
├── src/
│   ├── components/
│   ├── context/           # AuthContext
│   ├── api/               # axios instance
│   ├── pages/             # Profile, EditProfile, Login, Register
│   └── App.js

- `server/` – Backend API (Express + MongoDB)
server/
├── routes/                # authRoutes, profileRoutes
├── controllers/           # authController, profileController
├── middleware/            # authMiddleware.js
├── models/                # User.js, Profile.js
├── config/                # db.js (Mongo connection)
├── .env
└── server.js

