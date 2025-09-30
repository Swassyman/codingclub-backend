import Member from "../models/Member.js";

export async function createMember(req, res) {
  try {
    const { branch, year } = req.body;
    const { userId, user } = req.auth;
    if (!branch || !year)
      return res.status(400).json({ message: "Branch and year are required" });
    const existingMember = await Member.findOne({ clerkId: userId });
    if (existingMember)
      return res.status(400).json({ message: "Member already exists" });
    const newMember = new Member({
      clerkId: userId,
      name: user.firstName,
      emailID: user.emailAddresses[0]?.emailAddress,
      branch,
      year,
    });
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
    const member = await Member.findOne({ clerkId: req.auth.userId });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch member", error: error.message });
  }
}
