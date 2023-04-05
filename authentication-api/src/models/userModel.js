const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: [
      true,
      "this username is already exists, please provide another one",
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number.",
    ],
  },
  role: {
    type: String,
    default: "Basic",
  },
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
