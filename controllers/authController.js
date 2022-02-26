import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "./../errors/index.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields!");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already exist!");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
};
const login = async (req, res) => {
  try {
    await res.send("login");
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    await res.send("updateUser");
  } catch (error) {
    console.log(error);
  }
};
export { register, login, updateUser };
