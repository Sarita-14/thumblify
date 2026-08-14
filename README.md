Thumblify is a full-stack AI-powered YouTube thumbnail generator. Users can create stunning, professional thumbnails in seconds by simply describing their video. The app uses Hugging Face's FLUX.1-schnell AI model to generate high-quality images based on user input.
 Features

User Authentication (Register/Login with JWT)
AI Image Generation using Hugging Face FLUX.1-schnell
Multiple styles — Cinematic, Cartoon, Minimalist, Neon Glow and more
Multiple aspect ratios — 16:9, 4:3, 1:1, 9:16
Custom color schemes
Save all generated thumbnails to your account
Download thumbnails in high resolution PNG
Fully responsive design

🛠️ Tech Stack
Frontend:React.js (Vite),Tailwind CSS,Axios,React Router DOM
Backend: Node.js,Express.js,MongoDB (Mongoose),JWT Authentication,bcryptjs

AI & Deployment
Hugging Face Inference API (FLUX.1-schnell),Vercel (Frontend + Backend),MongoDB Atlas

Project Structure
thumblify/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── context/        # Auth Context
│   │   ├── pages/          # All Pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Generate.jsx
│   │   │   └── MyThumbnails.jsx
│   │   ├── api.js          # Axios config
│   │   └── App.jsx
│   └── vercel.json
└── server/                 # Node.js Backend
    ├── models/             # MongoDB Models
    ├── routes/             # API Routes
    ├── middleware/         # Auth Middleware
    ├── server.js
    └── vercel.json

     API Endpoints
     Method  Endpoint                      Description
     POST    /api/auth/register             Create new account
     POST    /api/auth/login                Login to account
     POST    /api/thumbnail/generate        Generate AI thumbnail
     GET     /api/thumbnail/my-thumbnails   Get user's thumbnails
