# **fresh-veggie**

## **Introduction**
Fresh Vegiee is a full-stack web application designed for a modern, local fruit and vegetable store. Customers can browse fresh produce, view product details, manage their cart, and place orders, while admins can manage inventory, products, and user data.

## Technologies Used

### **Frontend**
- **Framework**: NextJS (with TypeScript & Vite)
- **State Management**: Context API
- **Styling**: Tailwind CSS
- **HTTP Requests**: Axios
- **Authentication**: JWT-based authentication

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (with TypeScript)
- **Database**: Postgres (via Neon)
- **Authentication**: JWT & Bcrypt for hashing
- **API Testing**: Postman

## **Prerequisites**
Ensure you have the following dependencies installed:
- Node.js (v14 or higher)
- npm or yarn

## Getting Started

Follow these steps to set up your development environment:

### **1. Clone the repository:**  

```
git clone https://github.com/VigneshNukala/fresh-veggie.git
cd fresh-veggie
```

### **2. Install dependencies for both frontend and backend:**

- **Backend** : Navigate to the backend/ directory and run npm install (or yarn install).
```bash
cd backend
npm install  # or yarn install
```

- **Frontend** : Navigate to the root directory and run npm install (or yarn install).
```bash
cd ..
npm install  # or yarn install
```

### **3. Start the servers (Two Different Terminals):**
- **Backend**
To start the backend server, navigate to the backend/ directory (if not already there) and run in a seperate terminal:
```bash
cd backend
npm run dev  # or yarn dev
```
- **Frontend**
To start the frontend server, navigate to the root directory (if not already there) and run in a seperate terminal:
```bash
cd ..
npm run dev  # or yarn start
```

### **3. Open the servers**
Once both servers are running, open your browser and visit:
```
http://localhost:3000/
```
