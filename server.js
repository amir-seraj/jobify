import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

const app = express();
import connectDB from "./db/connect.js";
import notFoundMW from "./middlewares/not-found.js";
import errorHandlerMW from "./middlewares/error-handler.js";
import authRouter from "./routes/authRoutes.js";

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/api/v1/auth", authRouter);
app.use(notFoundMW);
app.use(errorHandlerMW);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
