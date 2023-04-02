require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes')
const mongoString = process.env.DATABASE_URL;

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
mongoose.connect(mongoString,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (err) => {
  console.log(err);
});
database.once("connected", () => {
  /* SERVER RUN */
  app.listen(3000, () => {
    console.log("app running on port 3000");
  });
});

/* ROUTES */
app.use('/api/v1', taskRoutes)