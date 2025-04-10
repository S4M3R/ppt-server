import PptxGenJS  from "pptxgenjs";
import { iSlideBase } from "../../zodParsers/presentations";



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

    // slide.addText(slide.elements[0].content, {
    //     x: 0,
    //     y: 0,
    // });
}

const addElement = (pptx:PptxGenJS, slide:PptxGenJS.Slide, element:Element) => {
    if(element.type === "text") {
        slide.addText(element.content, {
            x: slide.x ?? 0,
            y: slide.y ?? 0,
            fontSize: element.fontSize || 100,
            fontColor: element.fontColor || "black",
        });
    }
}

