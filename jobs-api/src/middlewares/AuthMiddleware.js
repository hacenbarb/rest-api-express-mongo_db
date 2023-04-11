const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  // CHECK HEADER
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      result: false,
      message: "Unauthorized",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      result: false,
      message: "Unauthorized",
      error,
    });
  }
}

module.exports = auth;
