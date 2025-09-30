import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  clerkId: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  emailID: { type: String, required: true, unique: true},
});

export default model("Member", memberSchema);
