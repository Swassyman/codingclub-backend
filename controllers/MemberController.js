import { get } from "http";
import Member from "../models/Member.js";

//todo: check if  member is already registered
export async function createMember(req, res) {
  try {
    const { name, branch, emailID, year } = req.body;
    const profileimg = req.file
      ? req.file.buffer.toString("base64")
      : undefined;

    const newMember = new Member({ name, branch, emailID, year, profileimg });
    await newMember.save();

    res.status(201).json({ message: "Member added!", member: newMember });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Member failed to add", error: error.message });
  }
}

export async function getMember(req, res) {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch members", error: error.message });
  }
}

const memberController =  {
    createMember,
    getMember,
}

export default memberController;
