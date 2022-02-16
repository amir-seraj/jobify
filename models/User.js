import mongoose from "mongoose";
import validator from "validator";

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

export default mongoose.model("user", userSchema);
