    import express from "express";
    const router = express.Router();
    import upload from "../utils/upload.js";
    import { createMember, getMemberProfile, login} from "../controllers/MemberController.js";
    import { authenticateCookie } from "../middlewares/jwtauth.js";

    router.post("/register", createMember);
    router.get("/profile/:memberId", authenticateCookie, getMemberProfile);
    router.post("/login", login);

    export default router;
