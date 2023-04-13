const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide a position"],
      trim: true,
    },
    description: {
      type: String,
      // this conditions are comented for making the development easier
      // required: [true, "Please provide a description"],
      // minlenght: [true, "Description must be at least 150 character"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Please prove a company name"],
      enum: ['microsoft', 'google', 'meta', 'apple'],
      trim: true,
      lowercase: true
    },
    status: {
      type: String,
      default: "PENDING",
      enum: ["INTERVIEW", "DECLINED", "PENDING"],
      uppercase: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please prove a user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
