import { Request, Response } from "express";

const postGeneration = async (req: Request, res: Response) => {
  res.status(200).send("Generation successful");
};

export default postGeneration;
