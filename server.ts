import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI as string);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
