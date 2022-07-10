import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "./../utils/checkPermission.js";
import moment from "moment";

import {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} from "../errors/index.js";
import mongoose from "mongoose";

// Create A Job
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values!");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Delete A Job
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  checkPermission(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Successfully! Job removed." });
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJob: jobs.length, numOfPages: 1 });
};

// Update Job
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new Error("Please provide all values!");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }
  //   check permission
  checkPermission(req.user, job.createdBy);
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

// Stats
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          count: { $sum: 1 },
        },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
