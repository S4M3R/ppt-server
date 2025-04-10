import express from "express";
import dotenv from "dotenv";
import generateRouter from "./routes/generate";

dotenv.config();

const app = express();


app.use(express.json());

app.use("/generate", generateRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
