import express from 'express';
const router = express.Router();
import upload from '../utils/upload.js';
import memberController from '../controllers/MemberController.js';

router.post('/', upload.single('image'), memberController.createMember);
router.get('/', memberController.getMember);

export default router;
