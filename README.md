# find-your-job

📌 Find Your Job – MERN Job Portal (Frontend + Backend on Vercel)

A modern job portal web application built with the MERN Stack where users can explore jobs, create accounts, log in, and apply for positions.
This project uses React for the frontend and Vercel Serverless Functions for the backend, fully deployed on Vercel.

🚀 Live Project Links

🌐 Frontend: https://your-frontend-url.vercel.app

🛠️ Backend API: https://your-backend-url.vercel.app/api

Replace the URLs with your actual deployed Vercel links.

🛠️ Tech Stack
Frontend

React.js

Axios

React Router

Tailwind CSS / CSS

Vercel Deployment

Backend

Node.js (Serverless Functions)

MongoDB + Mongoose

JWT Authentication

bcrypt Password Hashing

API Routing via Vercel Functions

🔥 Features
👤 User Features

Create account and sign in

Secure login with JWT

View latest jobs

Search & filter job posts

Apply to job openings

⚙️ Backend Features

Fully serverless architecture

Separate route handlers (/api/...)

Connected with MongoDB Atlas

Encrypted passwords

Token-based auth

📂 Folder Structure
find-your-job/
│
├── frontend/                → React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── api/                     → Vercel serverless backend
│   ├── login.js
│   ├── register.js
│   ├── jobs.js
│   ├── apply.js
│   └── ...
│
├── models/                  → MongoDB Schemas
│   ├── User.js
│   └── Job.js
│
├── utils/
│   └── dbConnect.js         → MongoDB connection
│
└── vercel.json              → Vercel configuration

⚙️ Installation & Local Setup
1️⃣ Clone the Repo
git clone https://github.com/AbhishekSingh33/find-your-job
cd find-your-job

2️⃣ Install Frontend Dependencies
cd frontend
npm install

3️⃣ Install Backend Dependencies

Go back to root:

cd ..
npm install

4️⃣ Add Environment Variables

Create a .env file in the root:

MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

5️⃣ Start Frontend
cd frontend
npm start

6️⃣ Start Backend (Serverless Testing)
vercel dev

🚀 Deployment (Vercel)
Frontend Deployment

Import repository on Vercel

Select frontend/ folder

Build & Deploy

Backend Deployment

Functions inside /api auto-deploy

Uses vercel.json for routing

Add Environment Variables

In Vercel dashboard:

MONGO_URI=
JWT_SECRET=

📸 Screenshots (Add later)
Feature	Screenshot
Home Page	Upload Later
Job Listing	Upload Later
Login Page	Upload Later
Dashboard	Upload Later
🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

🧑‍💻 Author

Abhishek Singh
Full Stack Developer | MERN | Cloud | Data Analytics
GitHub: https://github.com/AbhishekSingh33

📄 License

MIT License

If you want, I can also add:

✔ Shields/badges
✔ API documentation section



<img width="2159" height="1439" alt="image" src="https://github.com/user-attachments/assets/74d60e2d-d114-49f5-a344-72187a7a9358" />

✔ Screenshots section with sample images
✔ A “How to contribute” guide

Just say: “Add more sections” or “Add badges” 😊

