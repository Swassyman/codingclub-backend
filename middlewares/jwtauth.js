import jwt from "jsonwebtoken";

const BEARER_PREFIX = "Bearer ";

export function authenticateCookie(req, res, next) {
  let token = null;
  const authHeader = req.get("Authorization");

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
    token = authHeader.slice(BEARER_PREFIX.length);
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
}
