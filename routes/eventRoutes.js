import express from 'express';
const router = express.Router();
import upload from '../utils/upload.js';
import eventController from '../controllers/EventController.js';

router.post('/', upload.single('image'), eventController.createEvent);
router.get('/', eventController.getEvents);

export default router;