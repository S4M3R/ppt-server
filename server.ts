import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import templatesRouter from "./routes/templates";
import generateRouter from "./routes/generate";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI as string);

app.use(express.json());

app.use("/templates", templatesRouter);
app.use("/generate", generateRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
