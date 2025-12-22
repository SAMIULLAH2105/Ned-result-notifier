// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, department, year } = body;

//     if (!email || !department || !year) {
//       return new Response(
//         JSON.stringify({ error: "Missing fields" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     await connectDB();

//     await User.create({ email, department, year });

//     return new Response(
//       JSON.stringify({ success: true }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (err) {
//     console.error(err);
//     return new Response(
//       JSON.stringify({ error: "Server error" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


import { connectDB } from "@/lib/db";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, department, year } = body;

    if (!email || !department || !year) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();

    await User.create({ email, department, year });

    // Send confirmation email
    await sendConfirmationEmail(email, department, year);

    return new Response(
      JSON.stringify({ success: true, message: "Registered successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Nodemailer email function
async function sendConfirmationEmail(to: string, department: string, year: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `"NED Result Notifier" <${process.env.SMTP_USER}>`,
    to,
    subject: "Registration Successful",
    text: `Hello! You have successfully registered for result notifications for ${department} - ${year}.`,
    html: `<p>Hello!</p><p>You have successfully registered for result notifications for <b>${department} - ${year}</b>.</p>`
  });

  console.log("Confirmation email sent:", info.messageId);
}
