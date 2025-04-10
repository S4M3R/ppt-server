import { Request, Response } from "express";
import PptxGenJS from "pptxgenjs";
import { generateSlide } from "./generateSlide";
import { z } from "zod";
import { zPresentation } from "../../zodParsers/presentations";
import { convertPptToPdf } from "../../utils/ptttopdf";
import fs from "fs";
import { waitFileReady } from "../../utils/waitFileReady";

const zQuery = z.object({
  slide: z.string().optional(),
  format: z.enum(["pdf", "pptx"]).optional(),
});

const postGeneration = async (req: Request, res: Response) => {
  const { data: presentation, success, error } = zPresentation.safeParse(req.body);
  if (!success) {
    return res.status(400).send({error: error.message, zodError: error.format()});
  }
  const { data: query, success: querySuccess, error: queryError } = zQuery.safeParse(req.query);
  if (!querySuccess) {
    return res.status(400).send({error: queryError.message, zodError: queryError.format()});
  }

  const pptx = new PptxGenJS();
  
  pptx.title = presentation.title;
  presentation.slides.forEach((slide, index) => {
    let slideSelectionArray = query.slide ? query.slide.split(",") : [];
    if(slideSelectionArray.length > 0) {
      if(!slideSelectionArray.includes(index.toString())) {
        return;
      }
    }
    generateSlide(pptx, slide);
  });
  await pptx.writeFile({ fileName: "generations/test.pptx" });
  
  handleSend(res, "generations/test.pptx", "test", query.format ?? "pptx");
};

const handleSend = async (res: Response, path: string, fileName: string, format: "pdf" | "pptx") => {
    let filePath = process.cwd() + "/" + path;
    let filesToDelete = [filePath];
    if(format === "pdf") {
        const pdf = await convertPptToPdf({
            inputPath: path,
            outputPath: "generations",
            outputFileName: fileName
          });
          await waitFileReady(process.cwd() + "/" + pdf);
          filePath = process.cwd() + "/" + pdf;
          filesToDelete.push(filePath);
    } 
        await res.sendFile(filePath, {}, (err) => {
            if(err) {
                console.error("Error sending file: ", err);
            }
        filesToDelete.forEach((file) => {
            fs.unlinkSync(file);
        });
    });
}




export default postGeneration;