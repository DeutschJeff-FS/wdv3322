const jwt = require("jsonwebtoken");
require("dotenv").config();

const Messages = require("../messages/messages");

module.exports = (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token, process.env.jwt_key);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: Messages.unauth });
  }
};
