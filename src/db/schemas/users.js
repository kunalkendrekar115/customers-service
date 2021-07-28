const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  address: String,
  city: String,
  email: String,
  accessToken: String,
  password: String,
  mobileNumber: Number
});

module.exports = mongoose.model("UsersModal", usersSchema, "users");
