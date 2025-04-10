import { z } from "zod";




export type iTextElement = z.infer<typeof zTextElement>;
export type iSlideBase = z.infer<typeof zSlideBase>;
export type iPresentation = z.infer<typeof zPresentation>;
export type iElement = iTextElement;



export const zTextElement = z.object({
    type: z.literal("text"),
    content: z.string(),
    fontSize: z.number().optional(),
    fontColor: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
});




export const zSlideBase = z.object({
    backgroundImage: z.string(),
    elements: z.array(zTextElement),
});

export const zPresentation = z.object({
    title: z.string(),
    slides: z.array(zSlideBase),
});


