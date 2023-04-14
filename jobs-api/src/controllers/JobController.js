const Job = require("../models/JobModel");

async function getAllJobs(req, res) {
  try {
    const userId = req.user._id;
    const { position, company, sort } = req.params;
    const queryObject = {
      createdBy: userId,
    };
    if (position) {
      queryObject.position = { $regex: position, $options: "i" };
    }
    if (company) {
      queryObject.company = { $regex: `^${company}$`, $options: "i" };
    }
    const result = await Job.find(queryObject);

    if (!result) {
      return res
        .status(404)
        .json({ result: false, message: "You don't have jobs yet" });
    }

    // SORTING
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = await result.sort(sortList);
    } else {
      result = await result.sort("-createdAt");
    }

    // PAGINATION
    const page = Number(req.params.page) || 1;
    const limit = Number(req.params.limit) || 10;
    const skip = (page - 1) * limit;
    result = await result.skip(skip).limit(limit);

    return res.status(200).json({
      result: true,
      jobs: result,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error: "internal server error",
    });
  }
}
async function getJob(req, res) {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Job.findOne({ createdBy: userId, _id: jobId });
    if (!job) {
      return res.status(404).json({ result: false, message: "Job not found" });
    }
    return res.status(200).json({
      result: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error,
    });
  }
}
async function createJob(req, res) {
  try {
    const { position, description, company, status } = req.body;
    const userId = req.user._id;
    const queryObject = {
      position,
      description,
      company,
      status,
      createdBy: userId,
    };
    const job = await Job.create({ ...queryObject });
    return res.status(201).json({
      result: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error,
    });
  }
}
async function updateJob(req, res) {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;
    const { position, description, company, status } = req.body;

    if (!position && !description && !company && !status) {
      return res.status(400).json({
        result: false,
        message: "Please provide something to update",
      });
    }
    const jobObject = { createdBy: userId, _id: jobId };
    const updateSettings = { new: true, runValidators: true };
    const updateObject = {};
    if (position) updateObject.position = position;
    if (description) updateObject.description = description;
    if (company) updateObject.company = company;
    if (status) updateObject.status = status;
    const updatedJob = await Job.findOneAndUpdate(
      jobObject,
      updateObject,
      updateSettings
    );
    if (!updatedJob) {
      return res.status(404).json({ result: false, message: "Job not found" });
    }
    return res.status(200).json({
      result: true,
      updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error,
    });
  }
}
async function deleteJob(req, res) {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;
    const deleteObject = {
      createdBy: userId,
      _id: jobId,
    };
    const deletedJob = await Job.findOneAndDelete(deleteObject);
    if (!deletedJob) {
      return res.status(404).json({ result: false, message: "Job not found" });
    }
    return res.status(200).json({
      result: true,
      deletedJob,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error,
    });
  }
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
