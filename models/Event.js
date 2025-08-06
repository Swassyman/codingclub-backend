import { mongoose } from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventMode: { type: String, required: true },
  eventImage: { type: String, required: false },
});

export const Event = mongoose.model("Event", eventSchema);
