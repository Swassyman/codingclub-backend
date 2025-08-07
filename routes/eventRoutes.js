import express from 'express';
const router = express.Router();
import upload from '../utils/upload.js';
import {createEvent, getEvents} from '../controllers/EventController.js';

router.post('/', upload.single('image'), createEvent);
router.get('/', getEvents);

export default router;