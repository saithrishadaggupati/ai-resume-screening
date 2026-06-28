# RecruitAI — AI-Powered Resume Screening Platform

RecruitAI is an intelligent recruitment platform that automates resume screening using Generative AI. Instead of manually reviewing hundreds of resumes, recruiters can upload a candidate's resume and instantly receive a compatibility score, skill analysis, strengths, weaknesses, and AI-generated interview questions.

Built for the **Google Gen AI Academy APAC Cohort 2 Hackathon**, RecruitAI combines Google Gemini with modern cloud technologies to streamline the hiring process and help recruiters identify the best candidates faster.

---

## Live Demo

**Frontend:** https://taupe-kataifi-65a9b3.netlify.app

**Backend API:** https://ai-resume-screening-d5na.onrender.com

**GitHub Repository:** https://github.com/saithrishadaggupati/ai-resume-screening

---

## Problem Statement

Recruiters spend countless hours manually reviewing resumes before identifying qualified candidates. This process is repetitive, time-consuming, and difficult to scale.

RecruitAI automates the initial screening process by analyzing resumes against job requirements using Google Gemini, providing instant insights that enable recruiters to make faster and more informed hiring decisions.

---

## Features

- Create and manage job postings with required skills
- Upload PDF resumes for instant AI analysis
- AI-powered compatibility scoring (0–100%)
- Identify matched and missing skills
- Generate candidate strengths and improvement areas
- Create personalized interview questions
- Search candidates by name, skills, or experience
- Interactive recruiter dashboard with candidate rankings and analytics
- Secure cloud storage for uploaded resumes using Google Cloud Storage

---

## Tech Stack

### Frontend
- React 19
- Vite
- Material UI
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas

### Artificial Intelligence
- Google Gemini 2.5 Flash

### Cloud
- Google Cloud Storage
- MongoDB Atlas

### Deployment
- Netlify
- Render

---

## Architecture

RecruitAI follows a modern full-stack architecture.

- The React frontend provides a responsive dashboard for recruiters.
- The Express.js backend exposes REST APIs for authentication, job management, resume uploads, and AI analysis.
- Uploaded resumes are securely stored in Google Cloud Storage.
- Resume text is extracted and analyzed by Google Gemini 2.5 Flash, which returns structured JSON containing compatibility scores, matched skills, missing skills, strengths, weaknesses, and interview questions.
- Analysis results and candidate information are stored in MongoDB Atlas for fast retrieval and real-time dashboard visualization.

---

## Google Cloud Services Used

### Google Gemini 2.5 Flash
Used to:
- Analyze resume content
- Compare resumes with job descriptions
- Generate compatibility scores
- Identify matched and missing skills
- Generate strengths and weaknesses
- Create personalized interview questions

### Google Cloud Storage
Used to:
- Securely store uploaded PDF resumes
- Organize files with unique cloud storage paths
- Provide scalable and reliable document storage

---

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/saithrishadaggupati/ai-resume-screening
```

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create a `.env` file inside the **server** folder:

```env
MONGO_URI=
GEMINI_API_KEY=
JWT_SECRET=
GCS_KEY_JSON=
```

Run the backend:

```bash
cd server
npm start
```

Run the frontend:

```bash
cd client
npm run dev
```

---

## Why RecruitAI?

- Reduces manual resume screening time from minutes to seconds
- Delivers consistent AI-powered candidate evaluation
- Improves recruiter productivity with actionable insights
- Provides objective compatibility scoring
- Uses scalable Google Cloud infrastructure
- Demonstrates real-world application of Generative AI in recruitment

---

## Future Enhancements

- Bulk resume screening
- ATS score optimization
- Semantic candidate search
- AI-powered recruiter recommendations
- Interview scheduling integration
- Email notifications
- Multi-language resume support
- Advanced analytics dashboard

---

## Built By

**Daggupati Sai Thrisha**  
Final Year B.Tech, Computer Science Engineering  
National Institute of Technology Surathkal

**Email:** saithrishadaggupati@gmail.com