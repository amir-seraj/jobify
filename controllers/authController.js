import User from "../models/User.js";
import "express-async-errors";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields!");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("User already exist!");
  }
  const user = await User.create({ name, email, password });
  res.status(200).json({
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    location: user.location,
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
