const User = require("../models/UserModel");

async function register(req, res) {
  const { firstName, lastName, birthDate, email, password } = req.body;
  const tempUser = {
    firstName,
    lastName,
    birthDate,
    email,
    password,
  };
  try {
    const user = await User.create({ ...tempUser });
    const token = user.createJWT();
    res.status(201).json({
      result: true,
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
      error,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      result: false,
      message: "Please provide email and password",
    });
  }
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      result: false,
      message: "Invalid credentials",
    });
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      result: false,
      message: "Invalid credentials",
    });
  }
  const token = user.createJWT();
  return res.status(200).json({
    result: true,
    message: "Login success",
    user: {
      _id: user._id,
      email: user.email,
    },
    token: token,
  });
}

module.exports = { register, login };
