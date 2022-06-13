const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../model/user");
const { connect, findUser, saveUser, disconect } = require("../../db/db");

router.use(express.json());

router.get("/profile", (req, res, next) => {
  res.status(200).json({
    message: "User Profile - GET",
  });
});

router.post("/signup", (req, res, next) => {
  // find user by email
  findUser(req.body.email)
    // if user found, return error
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "User already exists",
        });
      } else {
        // encrypt password
        const password = req.body.password;
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            // create new user object
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              email: req.body.email,
              password: hash,
            });
            // save new user
            saveUser(user)
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Signup Successful",
                  method: req.method,
                  user,
                });
              })
              .catch((err) => {
                console.error(err.message);
                res.status(500).json({
                  error: {
                    message: err.message,
                  },
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: {
          message: "Unable to save profile",
        },
      });
    });
});

router.post("/login", (req, res, next) => {
  // find user
  findUser(req.body.email)
    .then((result) => {
      // if no user found
      if (!result) {
        // return error
        res.status(401).json({
          message: "Authentication failed",
        });
      } else {
        // compare passwords
        bcrypt.compare(req.body.password, result.password, (err, result) => {
          // test error
          if (err) return res.status(501).json({ message: err.message });

          // test result
          if (result) {
            res.status(200).json({
              message: "Login Successful",
              method: req.method,
              name: req.body.firstName,
            });
          } else {
            res.status(409).json({
              message: "Authorization Failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: {
          message: "Unable to log in",
        },
      });
    });
});

module.exports = router;
