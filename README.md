#  Pippo Eats – Full-Stack Food Ordering App

Pippo Eats is a food ordering application  built using:

React + TypeScript + Vite (Frontend)
Node.js + Express (Backend)
MongoDB (Database)
Context API (Cart Management)

It provides a complete food ordering flow — from browsing restaurants to placing an order — built with clean, modular, production-ready code.

---

Features

1. Homepage

Displays all restaurants in a 4-column responsive grid
Search bar to filter restaurants by name/cuisine
Restaurant cards with:

  * Image
  * Cuisines
  * Rating
  * ETA

2. Restaurant Menu Page

* Displays full menu of selected restaurant
* Menu item cards with images, prices & description
* Smooth increment / decrement (+/−) buttons
* Add/remove from cart
* Fully synced using Context API

3. Cart Page

* Shows all items added from menu
* Update quantity (+/−)
* Remove item
* Auto-calculated total price & item count
* Clean UI with golden themed buttons

4. Order Placement

* User enters name & phone number
* Order stored in MongoDB
* “Order placed successfully” message shown
* Cart clears on success

5. Backend API

* REST API built with Express
* Endpoints for:

  * Restaurants
  * Menus
  * Orders
* Seed script inserts sample restaurants & menus
* Image hosting from `backend/public/images`

### 📱 **6. Responsive UI**

* Works on mobile, tablet, desktop
* Responsive grid & cart layout
* Dark theme + golden accent

---

Tech Stack

Frontend

* React
* TypeScript
* Vite
* Context API
* CSS (custom)

Backend

* Node.js
* Express
* TypeScript (ts-node)
* MongoDB + Mongoose



## Project Structure

```bash
Pippo-Eats/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Order.ts
│   │   │   └── Restaurant.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── order.ts
│   │   │   └── restaurants.ts
│   │   │
│   │   ├── seed.ts
│   │   ├── db.ts
│   │   ├── server.ts
│   │   ├── testConn.ts
│   │   └── updateImages_fullurls.ts
│   │
│   ├── public/
│   │   └── images/
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── RestaurantCard.tsx
│   │   │   └── SearchBar.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CartPage.tsx
│   │   │   ├── Home.tsx
│   │   │   └── RestaurantPage.tsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── styles.css
│   │   ├── types.ts
│   │   └── index.html
│   │
│   └── package.json
│
└── README.md
```


---

Installation & Setup Guide

Follow these steps to run both backend & frontend on your machine.

---

Backend Setup

Step 1: Navigate to backend

```bash
cd backend
```

Step 2: Install dependencies

```bash
npm install
```

Step 3: Make sure MongoDB is running

Use MongoDB Compass or local MongoDB service.

Step 4: Seed the database

```bash
npx ts-node src/seed.ts
```

Expected:

```
Connected to MongoDB
Old data cleared.
Inserted all restaurants successfully.
```

Step 5: Start backend server

```bash
npm run dev
```

Backend runs at:
[http://localhost:5000]

---

Frontend Setup

Frontend Setup (React + TypeScript + Vite)

The frontend of Pippo Eats is built using Vite, which provides a fast development server and instant HMR.

Install Vite
```sh
npm create vite@latest frontend -- --template react-ts


## ⚙️ Running the Frontend (React + Vite)

You do NOT need to install Vite globally.

Vite is already included inside `package.json`, so it will install automatically.

### Steps:
```sh
cd frontend
npm install     # installs React, Vite, TypeScript, etc.
npm run dev     # starts the Vite development server

```

Frontend runs at:
[http://localhost:5173]

---

API Endpoints

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| GET    | `/api/restaurants`     | Fetch all restaurants   |
| GET    | `/api/restaurants/:id` | Fetch single restaurant |
| POST   | `/api/orders`          | Place an order          |

---


Production Readiness

Pippo Eats follows:

✔ Clean component structure
✔ Modular backend routes
✔ Context-based global state
✔ TypeScript for safety
✔ Fully functional food-ordering workflow


Author

Spurthi M. Pattanashetti
Full-Stack Developer (React + Node + Mongo)

---

