import { getAuth } from "@clerk/express";

export function clerkAuth(req, res, next) {
  const { userId, sessionId, user } = getAuth(req);
  req.user = {
    id: userId,
    sessionId,
    email: user?.emailAddresses[0]?.emailAddress,
  };

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: userId, sessionId };
  next();
}
