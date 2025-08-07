import express from 'express';
const router = express.Router();
import { register } from '../controllers/RegistrationController.js';
import { authenticateToken } from '../middlewares/jwtauth.js';

router.post('/:eventId', authenticateToken, register);

export default router;