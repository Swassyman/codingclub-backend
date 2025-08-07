import Member from "../models/Member.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createMember(req, res) {
  try {
    const { name, branch, emailID, year, password } = req.body;
    const profileimg = req.file
      ? req.file.buffer.toString("base64")
      : undefined;

    const hashed = await bcrypt.hash(password, 10);

    const newMember = new Member({
      name,
      branch,
      emailID,
      year,
      profileimg,
      password: hashed,
    });

    const existingUser = await Member.findOne({ emailID: emailID });
    if (existingUser) {
      return res.status(400).json({ message: "Email ID already used" });
    }

    await newMember.save();

    res.status(201).json({ message: "Member added!", member: newMember });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Member failed to add", error: error.message });
  }
}

export async function getMemberProfile(req, res) {
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

    const member = await Member.findOne({ emailID });
    if (!member) {
      return res.status(400).json({ message: "Member not found" });
    }

    const isMatch = bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password " });
    }

    const token = jwt.sign({ id: member._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
}
