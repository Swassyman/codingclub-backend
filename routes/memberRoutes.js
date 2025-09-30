    import express from "express";
    const router = express.Router();
    import { createMember, getMemberProfile} from "../controllers/MemberController.js";
    import { clerkAuth } from "../middlewares/jwtauth.js";

    router.post("/register", createMember);
    router.get("/profile", clerkAuth, getMemberProfile);

    export default router;
