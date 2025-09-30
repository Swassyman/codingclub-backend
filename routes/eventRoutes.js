import express from 'express';
const router = express.Router();
import {createEvent, getEvents} from '../controllers/EventController.js';
import { clerkAdmin } from '../middlewares/auth.js';
import { clerkAuth } from '../middlewares/jwtauth.js';

router.post('/create', clerkAuth, clerkAdmin, createEvent);
router.get('/', getEvents);

export default router;