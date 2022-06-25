require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const checkAuth = require("../../auth/checkAuth");
const User = require("../model/user");
const Messages = require("../../messages/messages");
const { connect, findUser, saveUser, disconect } = require("../../db/db");

//router.use(express.json());

router.get("/profile", checkAuth, (req, res, next) => {
  res.status(200).json({
    message: `Welcome. ${Messages.login_success}`,
    result: req.userData,
  });
});

router.post("/signup", (req, res, next) => {
  // find user by email
  findUser(req.body.email)
    // if user found, return error
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: Messages.conflict,
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
                  message: Messages.signup_success,
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
          message: Messages.save_fail,
        },
      });
    });
});

router.post("/login", (req, res, next) => {
  // find user
  findUser(req.body.email)
    .then((user) => {
      // if no user found
      if (!user) {
        // return error
        res.status(401).json({
          message: Messages.bad_request,
        });
      }
      // compare passwords
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        // test error
        if (err) return res.status(501).json({ message: err.message });
        // test result
        if (result) {
          const email = req.body.email;
          const password = result.password;
          const name = user.firstName;
          // create token
          const token = jwt.sign(
            {
              name: name,
              email: email,
              password: password,
            },
            process.env.jwt_key
          );
          // message authorization successful
          // send back payload token (token: token)
          res.status(200).json({
            message: Messages.auth_success,
            name: name,
            token: token,
          });
        } else {
          res.status(409).json({
            message: Messages.conflict,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: {
          message: Messages.login_fail,
        },
      });
    });
});

module.exports = router;
