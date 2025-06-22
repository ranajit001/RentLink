
# RentLink

RentLink - Connecting Tenants and Landlords, Seamlessly.

---

## Introduction

RentLink is a full-stack platform designed to streamline communication and rent management between tenants and landlords. It provides secure authentication, property management, maintenance request handling, rent tracking, and real-time chat, all in a modern web interface.

---

## Project Type

Fullstack (React Frontend + Node.js/Express Backend + MongoDB)

---

## Deployed App

- **Frontend:** https://your-frontend-deployment-url
- **Backend:** https://your-backend-deployment-url
- **Database:** MongoDB Atlas/local

---

## Directory Structure

```
RentLink/
├─ Backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  └─ app.js
│  └─ package.json
├─ Frontend/
│  └─ RentLink/
│     ├─ src/
│     │  ├─ components/
│     │  ├─ context/
│     │  ├─ pages/
│     │  ├─ routes/
│     │  ├─ utils/
│     │  └─ App.jsx
│     └─ package.json
└─ README.md
```

---

## Video Walkthrough of the Project

*Attach a short video walkthrough of all features here (1-3 minutes).*

---

## Video Walkthrough of the Codebase

*Attach a short video walkthrough of the codebase here (1-5 minutes).*

---

## Features

- User registration and login (tenant/landlord roles)
- JWT authentication with refresh tokens
- Landlord: Add properties, assign tenants, view property list, rent overview
- Tenant: View assigned properties, submit/view maintenance requests, rent history
- Real-time chat between tenants and landlords (Socket.IO)
- Secure, role-based dashboard navigation
- Persistent authentication (localStorage + cookies)
- Responsive UI with Tailwind CSS

---

## Design Decisions & Assumptions

- **Role-based Routing:** Dashboard routes are protected and rendered based on user role.
- **Persistent Auth:** Auth state is stored in localStorage for session persistence.
- **API Integration:** All API calls use a centralized `baseApi` for easy environment switching.
- **CORS:** Backend is configured to allow credentials and requests from the frontend origin.
- **UI Framework:** Tailwind CSS is used for rapid and consistent styling.
- **Assumption:** Property assignment uses property ID and tenant email.

---

## Installation & Getting Started

### Backend

```bash
cd Backend
npm install
# Set up .env with JWT_SECRET, JWT_REFRESH_SECRET, MONGO_URI, PORT
npm run dev
```

### Frontend

```bash
cd Frontend/RentLink
npm install
# Set up .env with VITE_API_BASE_URL (e.g., http://localhost:3000)
npm run dev
```

---

## Usage

1. Register as a tenant or landlord.
2. Login to access your dashboard.
3. Landlords can add properties, assign tenants, and view rent overview.
4. Tenants can view assigned properties, submit maintenance requests, and view rent history.
5. Use the chat feature for real-time communication.

**Screenshots:**  
*Include screenshots of the dashboard, property list, maintenance requests, and chat UI.*

---

## Credentials

*Provide demo credentials if available, e.g.:*

- **Landlord:** landlord@example.com / password123
- **Tenant:** tenant@example.com / password123

---

## APIs Used

- Internal REST API (Node.js/Express)
- Socket.IO for real-time chat

---

## API Endpoints

> **Note:** The backend API expects the following request bodies for POST/PATCH endpoints. All protected routes require:  
> `Authorization: Bearer <access-token>`

### AUTH
- **POST** `/api/auth/register`  
  `{ name, email, password, role, contactInfo, language }`
- **POST** `/api/auth/login`  
  `{ email, password }`
- **POST** `/api/auth/refresh-token`  
  *(no body)*

### PROPERTY (LANDLORD)
- **POST** `/api/property/landlord/add`  
  `{ name, address, amount }`
- **GET** `/api/property/landlord/my-properties`
- **POST** `/api/property/landlord/assign-tenant`  
  `{ propertyId, email }`

### PROPERTY (TENANT)
- **GET** `/api/property/tenant/my-properties`

### MAINTENANCE (TENANT)
- **POST** `/api/maintenance/tenant/create`  
  `{ propertyId, category, urgency, description, media }`
- **GET** `/api/maintenance/tenant`

### MAINTENANCE (LANDLORD)
- **GET** `/api/maintenance/landlord`
- **GET** `/api/maintenance/landlord/:id`
- **PATCH** `/api/maintenance/landlord/:id`  
  `{ status, message }`

### RENT
- **GET** `/api/rent/tenant`
- **PATCH** `/api/rent/tenant/pay/:rentId`
- **GET** `/api/rent/landlord`

### SOCKET.IO CHAT
- `send-message` → `{ senderId, receiverId, content }`
- `receive-message` → Live receive
- `message-error` → Error notification

---

## Technology Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Argon2, Socket.IO
- **Other:** dotenv, cookie-parser, CORS

---

*Feel free to reach out for any questions or