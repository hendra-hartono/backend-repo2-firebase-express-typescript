import express from "express";
import { json } from "body-parser";
const cookieParser = require("cookie-parser");
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
app.use(json());
app.use(cookieParser());
app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}!!!!!`);
  });
};

start();
