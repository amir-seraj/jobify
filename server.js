import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
dotenv.config();

const app = express();
import connectDB from "./db/connect.js";
import notFoundMW from "./middlewares/not-found.js";
import errorHandlerMW from "./middlewares/error-handler.js";
import authRouter from "./routes/authRoutes.js";
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.json({ msg: "WELCOME" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});
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
