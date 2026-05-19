# LearnHub — Online Learning Platform

A full-stack e-learning platform inspired by Udemy and Coursera, built with **React + Vite** on the frontend and **Node.js / Express / MongoDB** on the backend.

Students can browse, purchase, and complete courses. Instructors can create and manage courses, track earnings, and communicate with enrolled students. An admin panel provides oversight of the entire platform.

---

## Screenshots

| Landing Page | Student Dashboard | Instructor Dashboard |
|---|---|---|
| ![Landing Page](screenshots/Landing%20Page.png) | ![Student Dashboard](screenshots/User%20Dashboard.png) | ![Instructor Dashboard](screenshots/Instructor%20%20%20Dashboard.png) |

| Course Details | Course Access | User Profile |
|---|---|---|
| ![Course Details](screenshots/User%20Course%20Details.png) | ![Course Access](screenshots/User%20Course%20Access.png) | ![User Profile](screenshots/User%20Profile.png) |

---

## Features

### Student
- Register / Login with JWT authentication
- Browse and search available courses
- Enroll in courses via payment flow
- Access course content (videos, materials)
- Track progress and download completion certificates
- Participate in course discussion forums
- Manage profile and view enrolled courses

### Instructor
- Separate instructor auth (register / login)
- Create, edit, and delete courses with media uploads (Cloudinary)
- View enrolled students per course
- Track earnings dashboard with charts
- Manage instructor profile

### Admin
- Platform overview dashboard
- Manage users, instructors, and courses

### Platform
- OTP-based forgot-password via email
- Cloudinary image/video hosting
- PDF certificate generation
- Rate limiting, CORS, Helmet security headers
- Responsive design — works on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| UI | Bootstrap 5, React Bootstrap, React Icons |
| Charts | Chart.js, React-Chartjs-2 |
| HTTP | Axios (with interceptors) |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens (JWT) |
| File Uploads | Multer + Cloudinary |
| Email | Nodemailer (Gmail App Password) |
| PDF | PDFKit, Puppeteer |
| Security | Helmet, express-rate-limit, bcryptjs |
| Deploy | Vercel (server), any static host (client) |

---

## Project Structure

```
LearnHub/
├── Client/                   # React + Vite frontend
│   ├── public/               # Static assets (images)
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── HeaderStudent.jsx
│   │   │   ├── SideBar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ...
│   │   ├── Pages/
│   │   │   ├── User/         # Student-facing pages
│   │   │   ├── Instructor/   # Instructor portal pages
│   │   │   ├── Admin/        # Admin dashboard
│   │   │   ├── Navs/         # Marketing/info pages
│   │   │   └── LandingPage.jsx
│   │   ├── theme/
│   │   │   └── theme.css     # Global design system (CSS variables)
│   │   ├── utils/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx           # Router + auth state
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env.local            # Frontend env (see setup)
│   └── package.json
│
├── server/                   # Express API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js           # JWT middleware
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validateEnv.js
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Instructor.js
│   │   ├── Course.js
│   │   ├── Thread.js
│   │   └── Otp.js
│   ├── routes/
│   │   ├── user.js
│   │   ├── instructor.js
│   │   ├── admin.js
│   │   └── forum.js
│   ├── utils/
│   │   ├── CertificateGenerator.js
│   │   ├── cloudinary.js
│   │   ├── email.js
│   │   └── logger.js
│   ├── .env                  # Server env (never committed)
│   ├── .env.example          # Template — copy and fill in
│   ├── vercel.json           # Vercel deployment config
│   └── server.js             # Express entry point
│
├── screenshots/              # UI screenshots
├── .env.example              # Combined env template
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- [Cloudinary](https://cloudinary.com/) account (free tier works)
- Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) enabled

---

### 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/learnhub.git
cd learnhub
```

### 2 — Configure environment variables

**Server:**
```bash
cp server/.env.example server/.env
# Open server/.env and fill in your MongoDB URI, JWT secret,
# Cloudinary credentials, and Gmail app password.
```

**Client:**
```bash
# Create Client/.env.local
echo "VITE_REACT_APP_BACKEND_BASEURL=http://localhost:5000/api/v1" > Client/.env.local
```

### 3 — Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../Client
npm install
```

### 4 — Run locally

Open **two terminals**:

```bash
# Terminal 1 — start the API server
cd server
npm run dev          # runs on http://localhost:5000
```

```bash
# Terminal 2 — start the React dev server
cd Client
npm run dev          # runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
cd Client
npm run build        # outputs to Client/dist/
npm run preview      # preview the production build locally
```

---

## Deployment

### Backend — Vercel

1. Push the `server/` folder (or the whole repo) to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Set the **root directory** to `server`.
4. Add all environment variables from `server/.env.example` in the Vercel dashboard.
5. Deploy — `vercel.json` is already configured.

### Frontend — Vercel / Netlify / GitHub Pages

1. Set `VITE_REACT_APP_BACKEND_BASEURL` to your deployed API URL.
2. Run `npm run build` inside `Client/`.
3. Deploy the `Client/dist/` directory to any static host.

---

## API Overview

All endpoints are prefixed with `/api/v1`.

| Prefix | Description |
|---|---|
| `/api/v1/users` | Student auth, profile, enrolment, courses |
| `/api/v1/instructors` | Instructor auth, course CRUD, earnings |
| `/api/v1/admin` | Admin operations |
| `/api/v1/forums` | Discussion threads |
| `GET /health` | Server health check |

---

## Environment Variables Reference

| Variable | Location | Description |
|---|---|---|
| `VITE_REACT_APP_BACKEND_BASEURL` | `Client/.env.local` | Backend API base URL |
| `PORT` | `server/.env` | Express port (default 5000) |
| `NODE_ENV` | `server/.env` | `development` or `production` |
| `MONGODB_URI` | `server/.env` | MongoDB Atlas connection string |
| `JWT_SECRET` | `server/.env` | Secret for signing JWTs |
| `FRONTEND_URL` | `server/.env` | Client origin for CORS |
| `CLOUDINARY_CLOUD_NAME` | `server/.env` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `server/.env` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `server/.env` | Cloudinary API secret |
| `EMAIL_USER` | `server/.env` | Gmail address for sending emails |
| `EMAIL_PASS` | `server/.env` | Gmail App Password (not account password) |

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and keep PRs focused on a single concern.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

Built as a student project demonstrating a production-grade full-stack web application.
Inspired by [Udemy](https://www.udemy.com/) and [Coursera](https://www.coursera.org/).
