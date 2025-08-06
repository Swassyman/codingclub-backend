import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  emailID: { type: String, required: true },
  profileimg : { type: String, required: false},
});

export default model("Member", memberSchema);
