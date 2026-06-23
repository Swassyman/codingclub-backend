import express from "express";
const router = express.Router();
import upload from "../utils/upload.js";
import {
  createMember,
  getMemberProfile,
  login,
  updateRole,
} from "../controllers/MemberController.js";
import { authenticateCookie, requireSuperAdmin } from "../middlewares/jwtauth.js";

router.post("/register", createMember);
router.get("/profile/:memberId", authenticateCookie, getMemberProfile);
router.post("/login", login);

// Superadmin-only: promote/demote any member to admin or back to member
router.patch("/:memberId/role", authenticateCookie, requireSuperAdmin, updateRole);

export default router;
