const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const options = require("../config/options");
const userRoute = require("../api/routes/userRoute");

// Parsing middleware
app.use(express.urlencoded({ extended: true }));

// Parsing JSON requests
app.use(express.json());

// Middleware for handling CORS and headers
app.use(cors(options));

// GET request to check server
app.get("/", (req, res) => {
  res.status(200).json({
    message: `Service is up and running.`,
    method: req.method,
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

app.use((error, req, res, next) => {
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
