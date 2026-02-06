# Full-Stack E-Commerce Solution

A high-performance, responsive e-commerce platform built with the MERN stack. This project demonstrates a production-ready approach to decoupled architecture, featuring secure authentication, real-time state synchronization, and cloud-integrated media handling.



## 🚀 Key Features

* **Admin Dashboard:** Full CRUD operations for product management with real-time stock updates and data visualization.
* **Media Management:** Secure image uploading, storage, and optimization via the **Cloudinary API**.
* **Dynamic Shopping View:** Responsive product listings with advanced filtering and sorting by category and brand.
* **Real-Time Cart:** Persistent shopping cart with server-side stock validation to prevent overselling.
* **Secure Checkout:** Integrated **PayPal Sandbox** environment supporting international USD transactions.
* **Order Management:** Comprehensive order history and status tracking (Pending, Shipped, Delivered) for users.

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS, Shadcn UI, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Auth** | JWT (JSON Web Tokens) with Secure HTTP-Only Cookies |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 💡 Technical Challenges Overcome

### 1. Cross-Border Payment Integration
**Problem:** Encountered regional Sandbox restrictions for domestic Indian transactions within PayPal.
**Solution:** Implemented a **Currency Abstraction Layer** that standardizes transaction payloads to USD. This ensured seamless compatibility with the PayPal REST SDK while maintaining a consistent checkout experience regardless of the developer's locale.

### 2. State Synchronization & Data Integrity
**Problem:** Keeping the Redux frontend state in sync with the MongoDB backend during multi-step checkouts.
**Solution:** Orchestrated **Asynchronous Thunks** to manage side effects. I engineered the flow so that critical actions—like stock deduction and cart clearance—trigger atomically only *after* the payment gateway confirms successful capture.



### 3. Asynchronous Media Handling
**Problem:** Latency between third-party image uploads (Cloudinary) and database persistence causing "ghost" products.
**Solution:** Developed a pre-submission validation hook that ensures the Cloudinary asset URL is successfully returned and bound to the product model before the final POST request is sent to the Express server.

---

## 📦 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/Amey0210/rabbit-store.git](https://github.com/Amey0210/rabbit-store.git)
   cd rabbit-store

2. **Backend Setup**
  ```bash
  cd server
  npm install
### Create a .env file and add the following:
  MONGO_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
  npm start

3. Frontend Setup

cd client
npm install
# Create a .env file and add:
# VITE_API_URL=https://your-render-url.onrender.com
npm run dev

# Live Demo
Frontend Application: https://ecommerce-website-git-main-amey0210s-projects.vercel.app

Backend API Health Check: https://ecommerce-website-1-uafb.onrender.com


# Pro-Tips for the Reader
Production Build: For a production-ready frontend bundle, use npm run build to generate the dist folder.

Security: Always ensure your .env file is included in your .gitignore to prevent sensitive keys from being exposed in public repositories.