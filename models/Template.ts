import { Schema, model } from "mongoose";

const templateSchema = new Schema({
  name: String,
  description: String,
});


const Template = model("Template", templateSchema);

export default Template;
