const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');

//create a database connection
//create a separate file for this and then import/use that file here

mongoose.connect("mongodb+srv://amey2:Amey123@cluster0.ouuaakk.mongodb.net/?appName=cluster0").then(()=>console.log('MongoDB connected')).catch((error)=>console.log(error));



const app = express();
const PORT = process.env.PORT || 5000;




app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));