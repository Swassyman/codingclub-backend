import { Event } from "../models/Event.js";

export async function createEvent(req, res) {
  try {
    const { eventName, eventDescription, eventDate, eventVenue, eventMode } =
      req.body;
    const img = req.file ? req.file.buffer.toString("base64") : undefined;

    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventMode,
      img,
    });

    const existingEvent = await Event.findOne({ eventName: eventName });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }

    await newEvent.save();
    res.status(201).json({ message: "Event added!", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving event", error: error.message });
  }
}

export async function getEvents(_req, res) {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error loading event", error: error.message });
  }
}
