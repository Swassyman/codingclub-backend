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
    } = req.body;

    let eventImg = req.body.eventImg;
    if (req.file) {
      eventImg = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const existingEvent = await Event.findOne({ eventName: eventName });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }

    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
      eventMode,
      eventImg,
    });

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
    const events = await Event.find().sort({eventDate: -1});
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
    const events = registrations
      .map((reg) => reg.event)
      .filter((event) => event !== null);
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

    const users = registrations
      .map((reg) => reg.user)
      .filter((user) => user !== null);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error loading registrations" });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.params;

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete registrations associated with this event
    await Registration.deleteMany({ event: eventId });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
      error: error.message,
    });
  }
}
