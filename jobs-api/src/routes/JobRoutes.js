const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobController");
const router = express.Router();

router.get('/all', getAllJobs)

module.exports = router;
