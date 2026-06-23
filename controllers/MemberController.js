import Member from "../models/Member.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendRegistrationEmails from "../utils/sendMail.js";

export async function createMember(req, res) {
  try {
    const { name, branch, emailID, year, password, phoneNo } = req.body;

    if (!name || !branch || !emailID || !year || !password || !phoneNo) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = emailID.trim().toLowerCase();
    const existingUser = await Member.findOne({ emailID: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email ID already used" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newMember = new Member({
      name,
      branch,
      emailID: normalizedEmail,
      year,
      password: hashed,
      phoneNo,
    });

    await newMember.save();

    sendRegistrationEmails(newMember).catch((err) =>
      console.error("Error sending registration emails:", err)
    );

    res.status(201).json({
      message: "Member added!",
      member: {
        _id: newMember._id,
        name: newMember.name,
        branch: newMember.branch,
        emailID: newMember.emailID,
        year: newMember.year,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email ID already used",
      });
    }

    res.status(500).json({
      message: "Member failed to add",
      error: error.message,
    });
  }
}

export async function getMemberProfile(req, res) {
  if (req.params.memberId !== req.user.id) {
    return res.status(403).json({ message: "Access denied!" });
  }

  try {
    const member = await Member.findById(req.user.id).select("-password");
    if (!member) {
      return res.status(401).json({ message: "Member not found!" });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Member failed to fetch", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { emailID, password } = req.body;

    if (!emailID || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = emailID.trim().toLowerCase();

    const member = await Member.findOne({ emailID: normalizedEmail });
    if (!member) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: member._id, role: member.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: member._id,
        name: member.name,
        email: member.emailID,
        branch: member.branch,
        year: member.year,
        role: member.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
}

export async function updateRole(req, res) {
  const { memberId } = req.params;
  const { role } = req.body;

  const ALLOWED_ROLES = ["member", "admin"];
  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({
      message: `Invalid role. Must be one of: ${ALLOWED_ROLES.join(", ")}.`,
    });
  }

  try {
    const target = await Member.findById(memberId);
    if (!target) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (target.role === "superadmin") {
      return res.status(403).json({
        message: "Cannot change the role of a superadmin.",
      });
    }

    target.role = role;
    await target.save();

    return res.status(200).json({
      message: `Role updated to "${role}" for ${target.emailID}.`,
      member: { id: target._id, email: target.emailID, role: target.role },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update role", error: error.message });
  }
}
