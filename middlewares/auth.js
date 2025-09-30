import { requireAuth } from "@clerk/express";

const ADMIN_MAILS = process.env.ADMIN_EMAILS.split(",");

export function clerkAdmin(req, res, next) {
  const { user } = req.auth;

  if (!user) {
    res.status(401).json({ message: "Unauthorised" });
  }
  const userEmail = user.emailAddresses[0].emailAddress;
  if (ADMIN_MAILS.includes(userEmail)) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Not an Admin" });
  }
}
