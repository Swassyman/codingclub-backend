import Member from "../models/Member.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendRegistrationEmails from "../utils/sendMail.js";

export async function createMember(req, res) {
  try {
    const { name, branch, emailID, year, password } = req.body;

    if (!name || !branch || !emailID || !year || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await Member.findOne({ emailID: emailID });
    if (existingUser) {
      return res.status(400).json({ message: "Email ID already used" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newMember = new Member({
      name,
      branch,
      emailID,
      year,
      password: hashed,
    });

    await newMember.save();

    sendRegistrationEmails(req.body).catch((err) =>
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
    const member = await Member.findById(req.user.id);
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

    const isAdmin = emailID === process.env.ADMIN_EMAILS;

    const member = await Member.findOne({ emailID });
    if (!member) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: member._id, isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
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
        isAdmin,
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
