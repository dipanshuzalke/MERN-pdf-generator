
# 🧾 MERN STACK PDF Generator

A full-stack Invoice Generator application built using the **MERN Stack**:  
**MongoDB + Express.js + React + EncoreJS + Node.js**  
Featuring secure authentication, dynamic product input, PDF invoice generation, and dashboard tracking.

---

## 🌐 Live Demo

🔗 [Live App Link](https://mern-pdf-generator-ochre.vercel.app/)

---

## 🚀 Features

- ✅ User Registration and Login (with JWT Auth)
- ✅ Add multiple products with automatic Total & GST calculation
- ✅ Generate PDF Invoice using **Puppeteer**
- ✅ User Dashboard to view/download previous invoices
- ✅ Clean and responsive UI using **Tailwind CSS** and **shadcn/ui**
- ✅ Fully typed with **TypeScript** and global state managed using **Redux**
- ✅ Modern build setup using **EncoreJS**

---

## 🏗️ Tech Stack

| Layer      | Tech                     |
|------------|--------------------------|
| Frontend   | React + Redux + TypeScript |
| UI         | Tailwind CSS + shadcn/ui |
| Backend    | Node.js + Express.js     |
| Auth       | JWT (JSON Web Tokens)    |
| PDF Engine | Puppeteer                |
| Database   | MongoDB                  |
| Build Tool | EncoreJS                 |

---

## 📦 Installation

### 🔧 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/mwen-pdf-generator.git
cd mern-pdf-generator
```

#### 2. Setup the Backend

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

#### 3. Setup the Frontend

```bash
cd ../client
npm install
```

Start the frontend:

```bash
npm start
```

---

## 🗂️ Project Structure

```
mwen-pdf-generator/
├── client/                # React Frontend (Tailwind + shadcn/ui + Redux)
│   ├── src/
│   ├── tailwind.config.js
│   └── ...
├── server/                # Express Backend (MongoDB + Puppeteer)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
└── README.md
```

---

## 🧪 API Endpoints

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Login and receive JWT token   |
| POST   | `/api/invoice`       | Generate invoice & download pdf  |
| GET    | `/api/invoices`      | Get all invoices of user      |

---

## 🔗 Deployment Links

- 🌍 **Frontend**: [https://mern-pdf-generator-ochre.vercel.app/](https://mern-pdf-generator-ochre.vercel.app/)  
- 🛠️ **Backend**: [https://mern-pdf-generator.onrender.com](https://mern-pdf-generator.onrender.com)]
