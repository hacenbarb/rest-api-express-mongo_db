require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { AuthRoutes, JobRoutes } = require("./routes");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const { DATABASE_URI, PORT } = process.env || {
  DATABASE_URI:
    "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]",
  PORT: 3000,
};

const app = express();
app.use(express.json());

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (err) => {
  console.log(err);
});
database.once("connected", () => {
  console.log("connectd succefully to database");
  app.listen(PORT, () => {
    console.log("app running on port " + PORT);
  });
});

// ROUTES
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/jobs", AuthMiddleware, JobRoutes);
