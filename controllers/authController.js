import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "./../errors/index.js";

const register = async (req, res) => {
  // get user info form signup form
  const { name, email, password } = req.body;
  // check signup form
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields!");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already exist!");
  }
  // build new user
  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
      lastName: user.lastName,
    },
    token,
    location: user.location,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { name,lastName, email, location } = req.body;
  // check update profile form
  if (!name || !email || !location||!lastName) {
    throw new BadRequestError("Please provide all fields!");
  }
const user=await User.findOne({_id:req.user.userId})
  user.email=email;
  user.name=name;
  user.lastName=lastName;
  user.location=location;
  await user.save();
  const token=user.createJwt();
  res.status(StatusCodes.OK).json({
    user,token,location:user.location
  })
};
export { register, login, updateUser };
