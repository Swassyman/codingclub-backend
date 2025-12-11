import express from "express";
const router = express.Router();
import upload from "../utils/upload.js";
import {
  createEvent,
  getEvents,
  getRegistrations,
  getUserEvents,
  getUserEventsID,
} from "../controllers/EventController.js";
import { authenticateCookie, requireAdmin } from "../middlewares/jwtauth.js";

router.post("/create", upload.single("image"), createEvent);
router.get("/", getEvents);
router.post("/registeredEvents", authenticateCookie, getUserEventsID);
router.post("/userEvents", authenticateCookie, getUserEvents);
router.post(
  "/getregistrations",
  authenticateCookie,
  requireAdmin,
  getRegistrations
);
router.post("/createnewevent", authenticateCookie, requireAdmin, createEvent);

export default router;
