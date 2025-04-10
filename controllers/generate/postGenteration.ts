import { Request, Response } from "express";
import PptxGenJS from "pptxgenjs";
import { generateSlide } from "./generateSlide";
import { z } from "zod";
import { zPresentation } from "../../zodParsers/presentations";


const postGeneration = async (req: Request, res: Response) => {
  const { data: presentation, success, error } = zPresentation.safeParse(req.body);
  if (!success) {
    return res.status(400).send({error: error.message, zodError: error.format()});
  }
  const pptx = new PptxGenJS();
  
  pptx.title = presentation.title;
  presentation.slides.forEach((slide) => {
    generateSlide(pptx, slide);
  });
  pptx.writeFile({ fileName: "generations/test.pptx" });
  res.status(200).send("Generation successful");
};


export default postGeneration;