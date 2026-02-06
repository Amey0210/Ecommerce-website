require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes Import
const authRouter = require("./routes/auth/authRoutes");
const adminProductsRouter = require("./routes/admin/productsRoutes");
const adminOrderRouter = require("./routes/admin/orderRoutes");
const shopProductsRouter = require("./routes/shop/productsRoutes");
const shopCartRouter = require("./routes/shop/cartRoutes");
const shopAddressRouter = require("./routes/shop/addressRoutes");
const shopOrderRouter = require("./routes/shop/orderRoutes");
const shopSearchRouter = require("./routes/shop/searchRoutes");
const shopReviewRouter = require("./routes/shop/reviewRoutes");
const commonFeatureRouter = require("./routes/common/featureRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://ecommerce-website-h7hvgu4v0-amey0210s-projects.vercel.app", 
      "https://ecommerce-website-ochre-three.vercel.app" 
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type", 
      "Authorization", 
      "Cache-Control", 
      "Expires", 
      "Pragma"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Health Check for Render
app.get("/", (req, res) => {
  res.send("Rabbit Store Server is Live and Running!");
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));