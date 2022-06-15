import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    required: [true, "Please provide a name"],
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    required: [true, "Please provide a email"],
    type: String,
    minLength: 6,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    required: [true, "Please provide a password"],
    type: String,
    minLength: 6,
    maxLength: 20,
    select: false,
  },
  lastName: {
    type: String,
    default: "Lastname",
    trim: true,
  },
  location: {
    type: String,
    default: "City",
    trim: true,
  },
});

userSchema.pre("save", async function () {
  console.log(this.modifiedPaths())
  console.log(this.isModified("name"))
  if(this.isModified("password"))return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("user", userSchema);
