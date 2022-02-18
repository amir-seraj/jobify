import { StatusCodes } from "http-status-codes";

export default function errorHandler(error, res, req, next) {
  console.log(error);
  res.status(500).json({ msg: "there was an error" });
}
