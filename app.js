import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import eventRoute from "./routes/eventRoutes.js";
import memberRoute from "./routes/memberRoutes.js";
import registerRoute from "./routes/registerRoute.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { clerkAdmin } from "./middlewares/auth.js";
import { clerkAuth } from "./middlewares/jwtauth.js";

const app = express();

app.use(
  cors({
    origin: ["https://www.codingclubtkmce.in"],
    credentials: true,
  })
);

app.use(clerkMiddleware());
app.use(json());

app.use("/api/events", eventRoute);
app.use("/api/members", clerkAuth, memberRoute);
app.use("/api/register", clerkAuth, registerRoute);

app.get("/", (_req, res) => res.json({ status: "active" }));

export default app;
