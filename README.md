# FASTag Recharge Application

This is a full-stack web application for FASTag recharge management, built with MERN stack and integrated with Stripe payment gateway for secure online payments.

---

## Features
- User authentication (Sign up, Login)
- Vehicle registration and management
- Recharge FASTag balance securely using Stripe payments
- Recharge history with real-time payment status
- Responsive and accessible React frontend with Tailwind CSS
- Express.js backend with MongoDB database
- Payment intents and confirmations via Stripe API with secure card handling

---

## Technology Stack
- Frontend: React, React Router/HashRouter, Tailwind CSS, Stripe React SDK
- Backend: Node.js, Express.js, MongoDB with Mongoose ODM, Stripe API
- Authentication: JWT tokens
- Other: Axios for HTTP requests, dotenv for environment variables

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB instance
- Stripe account for test and live API keys

---

### Backend Setup

1. Clone the repository and navigate to the `backend` folder:
cd backend


2. Install backend dependencies:
npm install


3. Create a `.env` file in the `backend` folder with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PORT=5000


4. Start the backend server:
node server.js



---

### Frontend Setup

1. Navigate to the `frontend` folder:

cd frontend

2. Install frontend dependencies:

npm install


3. Create a `.env` file in the `frontend` folder with the following content:
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
REACT_APP_API_BASE_URL=http://localhost:5000/api



4. Start the React development server:
npm start


---

### Stripe Test Cards

Use the following card details for testing Stripe payments in test mode:

- Card Number: `4242 4242 4242 4242`
- Expiry: Any valid future date (e.g., 12/34)
- CVC: Any 3-digit number (e.g., 123)
- ZIP: Any 5-digit number (e.g., 12345)

---

## Usage

- Register and log in to your account.
- Add your vehicles with valid registration numbers.
- Select a vehicle and enter a recharge amount to pay securely using Stripe.
- View your recharge history and payment statuses on the dashboard.

---

## Security Notes

- Card details are handled securely using Stripe Elements, never sent to your backend directly.
- Backend uses Stripe secret keys from secure environment variables.
- JWT tokens are used for authenticated APIs.
- Ensure `.env` files are not committed to version control.

---
When should you use HashRouter?

Use HashRouter when:

You deploy to Render, GitHub Pages, or Netlify without rewrite rules

You want instant fix for refresh errors

SEO is not important (dashboard apps, admin apps, portals)

You want simple deployment