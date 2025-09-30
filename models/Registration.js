import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", registrationSchema);
