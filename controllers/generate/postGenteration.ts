import { Request, Response } from "express";
import PptxGenJS from "pptxgenjs";

const postGeneration = async (req: Request, res: Response) => {
  const pptx = new PptxGenJS();
//   pptx.createPptx();
  pptx.addSlide();
  pptx.writeFile({ fileName: "test.pptx" });
  res.status(200).send("Generation successful");
};

export default postGeneration;
