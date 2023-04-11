const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_LIFETIME } = process.env || {
  JWT_SECRET: "weakjwtsecret",
  JWT_LIFETIME: "7d",
};

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [45, "First name must not exceed 45 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [45, "Last name must not exceed 45 characters"],
    },
    birthDate: {
      type: Date,
      min: [
        new Date("01-01-1900"),
        "Birth date cannot be earlier than 01-01-1900",
      ],
      max: [new Date(), "Birth date cannot be later than current date"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      trim: true,
      unique: true,
      maxlength: [45, "Email must not exceed 45 characters"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter and one number.",
      ],
    },
    role: {
      type: String,
      uppercase: true,
      default: "BASIC",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const unHashedpassword = this.password;
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(unHashedpassword, salt);
  this.password = hashedPassword;
  next();
});
UserSchema.methods.checkPassword = async function (loginPassword) {
  return bcrypt.compare(loginPassword, this.password)
}
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
