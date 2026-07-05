# AI-Powered Uttarakhand Tourism Copilot

An AI-assisted full-stack web application that helps users explore tourist destinations in Uttarakhand through a modern web interface and a PostgreSQL-powered REST API. The project is being developed as part of the **AI-Assisted Full Stack Web Development Internship**.

---

# Features

- Explore popular tourist destinations in Uttarakhand
- Create, view, update, search, and delete destinations
- PostgreSQL database with persistent data storage
- RESTful API architecture
- Modular Express.js backend
- Responsive frontend built with Next.js
- Prisma ORM integration
- Cloud-hosted database using Supabase

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- CORS
- dotenv

## Tools

- Prisma
- Supabase
- Postman
- Git & GitHub
- VS Code

---

# Database Choice

This project uses **PostgreSQL** hosted on **Supabase** together with **Prisma ORM**.

### Why PostgreSQL?

- Structured relational database
- Persistent cloud storage
- Easy relationship management
- Type-safe database queries with Prisma
- Scalable and production-ready

---

# Project Structure

```text
ai-uttarakhand-tourism-copilot/
│
├── app/
├── components/
├── public/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── destinationController.js
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── routes/
│   │   └── destinations.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── package.json
└── README.md
```

---

# Database Schema

The project currently contains the following entities:

- User
- Destination
- Homestay
- Trip

> **Schema Diagram**

Add your exported schema diagram here.

```md
![Database Schema](images/schema-diagram.png)
```

---

# Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/:id` | Get destination by ID |
| GET | `/api/destinations/search?q=` | Search destinations |
| POST | `/api/destinations` | Create destination |
| PUT | `/api/destinations/:id` | Update destination |
| DELETE | `/api/destinations/:id` | Delete destination |

---

# Backend Architecture

The backend follows a modular Express.js architecture.

```text
Client
      │
      ▼
server.js
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL (Supabase)
```

---

# How to Run the Frontend

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Frontend URL

```text
http://localhost:3000
```

---

# How to Run the Backend

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
DATABASE_URL=your_supabase_database_url
```

Run database migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start the backend server

```bash
npm run dev
```

Backend URL

```text
http://localhost:5000
```

---

# Environment Variables

### `.env`

```env
PORT=5000
DATABASE_URL=your_supabase_database_url
```

### `.env.example`

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
```

---

# API Testing

All endpoints were tested successfully using **Postman**.

Verified operations include:

- Create
- Read
- Update
- Delete
- Search

All operations interact directly with the PostgreSQL database hosted on Supabase.

---

# Week 5 Achievements

- Configured PostgreSQL database using Supabase
- Integrated Prisma ORM
- Designed relational database schema
- Performed Prisma migrations
- Generated Prisma Client
- Connected Express.js backend to PostgreSQL
- Migrated from in-memory storage to persistent database storage
- Implemented complete CRUD operations
- Added search functionality
- Refactored backend into Routes and Controllers architecture

---

# Future Improvements

- User Authentication
- Role-Based Authorization
- AI Trip Planner using Gemini API
- Homestay Management
- Saved Trips
- Interactive Maps
- Weather Integration
- Trip Budget Planner
- AI Chat Assistant

---

# Author

**Saurabh Chandravanshi**

B.Tech Information Technology  
Gautam Buddha University

**AI-Assisted Full Stack Web Development Internship**

