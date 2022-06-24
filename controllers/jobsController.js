import Job from "../models/Job.js"
import {StatusCodes} from "http-status-codes";
import {BadRequestError,UnauthenticatedError} from"../errors/index.js"

const createJob = async (req, res) => {
const {position,company}=req.body;

if(!position||!company){
  throw new BadRequestError("Please provide all values!")
}
req.body.createdBy=req.user.userId;
const job=await Job.create(req.body);
res.status(StatusCodes.CREATED).json({job})
};
const deleteJob = async (req, res) => {
  try {
    await res.send("deleteJob");
  } catch (error) {
    console.log(error);
  }
};
const getAllJobs = async (req, res) => {
  try {
    await res.send("getAllJobs");
  } catch (error) {
    console.log(error);
  }
};
const updateJob = async (req, res) => {
  try {
    await res.send("updateJob");
  } catch (error) {
    console.log(error);
  }
};
const showStats = async (req, res) => {
  try {
    await res.send("showStats");
  } catch (error) {
    console.log(error);
  }
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
