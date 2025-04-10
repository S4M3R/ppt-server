import { Request, Response } from "express";
import Template from "../../models/Template";

const getTemplates = async (req: Request, res: Response) => {
  const templates = await Template.find();
  res.status(200).json(templates);
};

export default getTemplates;
