const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("../api/routes/userRoute");

// Parsing middleware
app.use(express.urlencoded({ extended: true }));

// Parsing JSON requests
app.use(express.json());

// Middleware for handling CORS and headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  }
  next();
});

// GET request to check server
app.get("/", (req, res) => {
  res.status(200).json({
    message: `Service is up and running.`,
  });
});

// Routes
app.use("/users", userRoute);

// Middleware to handle errors and bad URLs
app.use((req, res, next) => {
  const error = new Error(`NOT FOUND!`);
  error.status = 404;
  next(error);
});

app.use((req, res, next, error) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURL, (err) => {
  if (err) {
    console.error("Error: ", err.message);
  } else {
    console.log("MongoDB connection successful");
  }
});

module.exports = app;
