import converter from "@hckrnews/ppt2pdf"
import fs from "fs";

interface ConversionConfig {
    inputPath: string;
    outputPath: string;
    outputFileName: string;
}

export async function convertPptToPdf({
    inputPath,
    outputPath,
    outputFileName
}: ConversionConfig): Promise<string> {
    try {
        
        // Convert the file
        const result = converter.create({
            file: inputPath,
            output: outputPath,
        });

        await result.convert();
        let inputFileName = inputPath.split("/").pop();
        inputFileName = inputFileName?.split(".")[0];
        if(inputFileName !== outputFileName) {
            await fs.renameSync(outputPath + "/" + inputFileName + ".pdf", outputPath + "/" + outputFileName + ".pdf");
        }

        return outputPath + "/" + outputFileName + ".pdf";

    } catch (error) {
        console.error('Error converting PPT to PDF:', error);
        throw error;
    }
}