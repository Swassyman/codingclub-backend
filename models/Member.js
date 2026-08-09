import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  emailID: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  role: {
    type: String,
    enum: ["member", "admin", "superadmin"],
    default: "superadmin",
  },
});

export default model("Member", memberSchema);
