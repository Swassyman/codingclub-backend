import express from 'express';
const router = express.Router();
import { register } from '../controllers/RegistrationController.js';
import { clerkAuth } from '../middlewares/jwtauth.js';
import { mockAuth } from '../middlewares/mockauth.js';

router.post('/:eventId', clerkAuth, register);

export default router;