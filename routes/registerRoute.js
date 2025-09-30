import express from 'express';
const router = express.Router();
import { register } from '../controllers/RegistrationController.js';
import { authenticateCookie } from '../middlewares/jwtauth.js';

router.post('/:eventId', authenticateCookie, register);

export default router;