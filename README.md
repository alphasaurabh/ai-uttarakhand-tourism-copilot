# AI-Powered Uttarakhand Tourism Copilot

An AI-assisted full-stack web application that helps users explore popular tourist destinations in Uttarakhand and provides dynamic destination management through REST APIs.

---

## Features

* Explore popular destinations in Uttarakhand
* Dynamic destination data from backend APIs
* Create, update, search, and delete destinations
* Responsive and modern user interface
* Frontend and backend integration
* RESTful API architecture

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### Tools & Utilities

* Postman
* Git & GitHub
* VS Code

---

## Project Structure

```text
ai-uttarakhand-tourism-copilot/
│
├── app/
├── components/
├── public/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
│
├── package.json
└── README.md
```

---

## Backend API Endpoints

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/api/destinations`           | Get all destinations  |
| GET    | `/api/destinations/:id`       | Get destination by ID |
| GET    | `/api/destinations/search?q=` | Search destinations   |
| POST   | `/api/destinations`           | Create a destination  |
| PUT    | `/api/destinations/:id`       | Update a destination  |
| DELETE | `/api/destinations/:id`       | Delete a destination  |

---

## How to Run the Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## How to Run the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Environment Variables

`.env`

```env
PORT=5000
```

`.env.example`

```env
PORT=
```

---

## API Testing

All API endpoints were tested using Postman.

The exported collection file is:

```text
W4_APICollection_[InternID].json
```

---

## Week 4 Achievements

* Set up an Express.js backend server.
* Designed and implemented 6 REST API endpoints.
* Added proper HTTP status codes and error handling.
* Connected the Next.js frontend to the backend.
* Replaced hardcoded data with live API data.
* Successfully transformed the project into a full-stack application.

---

## Future Improvements

* PostgreSQL database integration
* Supabase authentication
* AI-powered trip planning
* Destination recommendations
* User dashboard and saved trips
* Interactive maps and weather integration

---

## Author

**Saurabh Chandravanshi**
B.Tech Information Technology
Gautam Buddha University

**Project:** AI-Powered Uttarakhand Tourism Copilot

