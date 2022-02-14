import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
import connectDB from "./db/connect.js";
import notFoundMW from "./middlewares/not-found.js";
import errorHandlerMW from "./middlewares/error-handler.js";

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(notFoundMW);
app.use(errorHandlerMW);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
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
