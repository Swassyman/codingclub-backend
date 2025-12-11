import { Event } from "../models/Event.js";
import Registration from "../models/Registration.js";

export async function createEvent(req, res) {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventMode,
      eventImg,
    } = req.body;

    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventMode,
      eventImg,
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

export async function getUserEventsID(req, res) {
  const userId = req.user.id;
  try {
    const registrations = await Registration.find({ user: userId });
    const events = registrations.map((reg) => reg.event);
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error loading user events", error: error.message });
  }
}

export async function getUserEvents(req, res) {
  const userId = req.user.id;
  try {
    const registrations = await Registration.find({ user: userId }).populate(
      "event"
    );
    const events = registrations.map((reg) => reg.event);
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error loading user events", error: error.message });
  }
}

export async function getRegistrations(req, res) {
  const { eventId } = req.body;
  try {
    const registrations = await Registration.find({ event: eventId }).populate(
      "user"
    );

    const events = registrations.map((reg) => reg.user);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error loading registrations" });
  }
}
