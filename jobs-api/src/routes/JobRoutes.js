const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobController");
const router = express.Router();

router.get("/all", getAllJobs);
router.get("/:id", getJob);

router.post("/create", createJob);

router.patch("/update/:id", updateJob)

router.delete("/delete/:id", deleteJob)

module.exports = router;
