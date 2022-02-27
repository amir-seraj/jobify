import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import connectDB from "./db/connect.js";
import notFoundMW from "./middlewares/not-found.js";
import errorHandlerMW from "./middlewares/error-handler.js";
import authRouter from "./routes/authRoutes.js";
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use("/api/v1/auth", authRouter);
app.use(notFoundMW);
app.use(errorHandlerMW);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
