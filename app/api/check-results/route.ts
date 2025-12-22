import fetch from "node-fetch"; // or built-in fetch
import * as cheerio from "cheerio";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  try {
    await connectDB();

    // 1️⃣ Fetch NEDUET results page
    const response = await fetch("https://www.neduet.edu.pk/examination_results");
    const html = await response.text();

    // 2️⃣ Load HTML using Cheerio
    const $ = cheerio.load(html);

    // 3️⃣ Example: find all table rows with results
    const results: { department: string; year: string }[] = [];

    $("table tr").each((_, el) => {
      const tds = $(el).find("td");
      if (tds.length >= 2) {
        const department = $(tds[0]).text().trim();
        const year = $(tds[1]).text().trim();
        if (department && year) {
          results.push({ department, year });
        }
      }
    });

    // 4️⃣ Query users in matching department/year
    for (const res of results) {
      const users = await User.find({
        department: res.department,
        year: res.year
      });

      // 5️⃣ Send email to each user
      for (const user of users) {
        await sendEmail(user.email, res.department, res.year);
      }
    }

    return new Response(
      JSON.stringify({ success: true, sentTo: results.length }),
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
async function sendEmail(to: string, department: string, year: string) {
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
    subject: "Your Result is Out!",
    text: `Hello! The result for ${department} - ${year} has been uploaded. Check NEDUET website.`,
    html: `<p>Hello!</p><p>The result for <b>${department} - ${year}</b> has been uploaded. Check <a href="https://www.neduet.edu.pk/examination_results">NEDUET website</a>.</p>`
  });

  console.log("Email sent:", info.messageId);
}
