import express from "express";
const router = express.Router();
import upload from "../utils/upload.js";
import {
  createEvent,
  getEvents,
  getRegistrations,
  getUserEvents,
  getUserEventsID,
  deleteEvent,
} from "../controllers/EventController.js";
import { authenticateCookie, requireAdmin } from "../middlewares/jwtauth.js";

router.post(
  "/create",
  authenticateCookie,
  requireAdmin,
  upload.single("image"),
  createEvent
);
router.get("/", getEvents);
router.post("/registeredEvents", authenticateCookie, getUserEventsID);
router.post("/userEvents", authenticateCookie, getUserEvents);
router.post(
  "/getregistrations",
  authenticateCookie,
  requireAdmin,
  getRegistrations
);
router.post(
  "/createnewevent",
  authenticateCookie,
  requireAdmin,
  upload.single("image"),
  createEvent
);
router.delete(
  "/:eventId",
  authenticateCookie,
  requireAdmin,
  deleteEvent
);

export default router;
