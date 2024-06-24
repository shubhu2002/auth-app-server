import express, { type Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/user";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/user", userRoute);
app.get("/", (req: Request, res: Response) => {
  res.json("hello world");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server started at port : ", process.env.PORT);
});
