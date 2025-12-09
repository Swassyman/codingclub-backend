import { transporter } from "./mailer.js";

export default async function sendRegistrationEmails(member) {
  // send to user
  await transporter.sendMail({
    from: `"Coding Club TKMCE" <${process.env.GMAIL_USER}>`,
    to: member.emailID,
    subject: "Welcome to Coding Club TKMCE 🚀",
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; background-color: #020617; color: #e5e7eb;">
        <h1 style="color: #22c55e;">Welcome aboard, ${member.name} 👋</h1>
        <p>You're now registered as a member of <strong>Coding Club TKMCE</strong>.</p>
        <div style="margin-top:16px; padding:16px; border-radius:12px; background:#020617; border:1px solid #1f2933;">
          <h2 style="margin:0 0 8px 0; color:#a855f7;">Your Details</h2>
          <p style="margin:4px 0;"><strong>Name:</strong> ${member.name}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${member.emailID}</p>
          <p style="margin:4px 0;"><strong>Branch:</strong> ${member.branch}</p>
          <p style="margin:4px 0;"><strong>Year:</strong> ${member.year}</p>
        </div>
        <p style="margin-top:16px;">You'll receive updates about events, workshops, and more soon 🚀</p>
        <p style="margin-top:24px; font-size:12px; color:#9ca3af;">If this wasn't you, please ignore this email or contact the club coordinators.</p>
      </div>
    `,
  });

  // send to admin
  await transporter.sendMail({
    from: `"Coding Club TKMCE" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Member Registration: ${member.name}`,
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; background-color: #020617; color: #e5e7eb;">
        <h1 style="color: #22c55e;">New Member Registered ✅</h1>
        <p>A new member has just registered on the website.</p>
        <div style="margin-top:16px; padding:16px; border-radius:12px; background:#020617; border:1px solid #1f2933;">
          <p style="margin:4px 0;"><strong>Name:</strong> ${member.name}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${member.emailID}</p>
          <p style="margin:4px 0;"><strong>Branch:</strong> ${member.branch}</p>
          <p style="margin:4px 0;"><strong>Year:</strong> ${member.year}</p>
          <p style="margin:4px 0;"><strong>Member ID:</strong> ${member.id}</p>
        </div>
        <p style="margin-top:16px;">You may want to add them to WhatsApp/Discord or your internal tracking sheet.</p>
      </div>
    `,
  });
}
