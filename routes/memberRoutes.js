import express from "express";
const router = express.Router();
import upload from "../utils/upload.js";
import { createMember, getMemberProfile, login} from "../controllers/MemberController.js";
import { authenticateToken } from "../middlewares/jwtauth.js";

router.post("/", upload.single("image"), createMember);
router.get("/", authenticateToken, getMemberProfile);
router.post("/login", login);

export default router;
