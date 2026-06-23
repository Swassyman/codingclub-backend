import Member from "../models/Member.js";

export default async function seedSuperAdmin() {
  const email = (process.env.SUPERADMIN_EMAIL || "").trim().toLowerCase();

  if (!email) {
    console.warn("[seed] SUPERADMIN_EMAIL not set — skipping superadmin seed.");
    return;
  }

  const member = await Member.findOne({ emailID: email });

  if (!member) {
    console.warn(
      `[seed] No registered member found with email "${email}". ` +
        `Register the account first, then restart the server to grant superadmin.`
    );
    return;
  }

  if (member.role === "superadmin") {
    console.log(`[seed] "${email}" is already superadmin. Nothing to do.`);
    return;
  }

  await Member.findByIdAndUpdate(member._id, { role: "superadmin" });
  console.log(`[seed] ✅ "${email}" promoted to superadmin.`);
}
