const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (password) =>bcrypt.hashSync(password,10)
  },
  messages:{
    type:Array
  },
  connections:{
    accepted:Array,
    pending:Array,
    blocked:Array
  }
});

module.exports = mongoose.model("User", userSchema,"intrachat");
