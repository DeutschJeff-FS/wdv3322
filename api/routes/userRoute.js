const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/profile", (req, res) => {
  res.status(200).json({
    message: "User Profile - GET",
  });
});

router.post("/signup", (req, res) => {
  res.status(200).json({
    message: "User Signup - POST",
  });
});

router.post("/login", (req, res) => {
  res.status(200).json({
    message: "User Login - POST",
  });
});

module.exports = router;
