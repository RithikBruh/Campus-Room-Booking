# IITH Campus Room Booking System

A **full-stack role-based** room reservation platform built for educational institutions. The system allows users to book campus rooms, prevents scheduling conflicts, supports Google authentication, and sends automated email notifications.

🔗 Live Demo: https://campus-room-booking-tawny.vercel.app

---

## Overview

Managing room reservations through spreadsheets or manual requests often results in scheduling conflicts and poor visibility.

This project provides a centralized booking platform where users can:

- Sign in using Google OAuth
- Request room reservations / admin Approve (or) Reject them 
- View booking status
- Receive email notifications
- Avoid overlapping bookings through automatic conflict detection
- Add/Delete Venues/Rooms as an admin 


---
## Tech Stack

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" />
</p>

### Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
</p>

### Database & Authentication

<p>
  <img src="https://skillicons.dev/icons?i=postgres,supabase" />
  <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" width="48" />
</p>

### Services

<p>
  <img src="https://avatars.githubusercontent.com/u/109057257?s=200&v=4" width="48" />
</p>

Resend (Email Notifications)

---
## Key Features

### Authentication
- Google OAuth login
- Session management using Supabase Auth

### Booking Management
- Create booking requests
- View reservation status
- Booking history
- Accept / reject bookings (admin)

### Conflict Detection
- The backend automatically rejects overlapping bookings.

### Email Notifications
- Backend uses resend to send email when booking status changed
---

## Architecture

```mermaid
flowchart LR
    User[User Browser]

    User --> FE[Next.js Frontend]
    FE --> BE[Express.js Backend]

    BE --> DB[(Supabase PostgreSQL)]
    BE --> AUTH[Google OAuth]
    BE --> EMAIL[Resend]

    AUTH --> BE
    EMAIL --> User
```

## Screenshots

### Login

![Login](assets/screenshots/login.png)


### Student Dashboard

![Student dashboard](assets/screenshots/student.png)



### Admin Dashboard

![Admin](assets/screenshots/admin.png)


---


## Local Setup

### 1.Clone the repo
```bash
git clone https://github.com/RithikBruh/Campus-Room-Booking.git
```

### 2.Install dependencies:

```bash
npm install
```
### 3.Configure Supabase and Google Oauth

### 4.Create Environment Variables

Frontend : 

```bash
room-booking-frontend/.env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<YOUR_SUPABASE_PUBLISHABLE_KEY>
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

Backend

```bash
room-booking-backend/.env
```



```env
DB_PSWD=<YOUR_DATABASE_PASSWORD>
DATABASE_URL=<YOUR_DATABASE_URL>

SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>

RESEND_API_KEY=<YOUR_RESEND_API_KEY>

PORT=3000
FRONTEND_URL=http://localhost:3001
```

### 5.Run
Run backend/frontend:
```
npm run dev
```

---


## Author

-Sai Rithik

-GitHub: https://github.com/RithikBruh