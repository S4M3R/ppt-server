import PptxGenJS  from "pptxgenjs";
import { iElement, iSlideBase } from "../../zodParsers/presentations";



export const generateSlide = async (pptx:PptxGenJS, slideBase:iSlideBase) => {

    const slide = pptx.addSlide();

    if(slideBase.backgroundImage) {
        slide.addImage({
            path: slideBase.backgroundImage,
            x: 0,
            y: 0,
            w: "100%",
            h: "100%",
        });
    }

    slideBase.elements.forEach((element) => {
        addElement(pptx, slide, element);
    })

}

const addElement = (pptx:PptxGenJS, slide:PptxGenJS.Slide, element:iElement) => {
    if(element.type === "text") {
        slide.addText(element.content, {
            x: element.x ?? 0,
            y: element.y ?? 0,
            w: element.w ?? "100%",
            h: element.h ?? "100%",
            fontSize: element.fontSize || 100,
            color: element.fontColor || "#000000",
        });
    }
}

