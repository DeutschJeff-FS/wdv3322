const mongoose = require("mongoose");

const User = require("../api/model/user");

const connect = async () => {
  await mongoose.connect();
};

const findUser = async (email) => {
  return await User.findOne({ email: email }).exec();
};

const saveUser = async (user) => {
  return await user.save();
};

const disconnect = async () => {
  await mongoose.connection.close();
};

module.exports = { connect, findUser, saveUser, disconnect };
