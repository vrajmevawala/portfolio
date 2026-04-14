import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Essential for some deployment environments
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mevawalavraj@gmail.com",
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #e8720c; border-bottom: 2px solid #e8720c; padding-bottom: 8px;">New Contact Form Submission</h2>
          <div style="background: #fdfdfd; padding: 20px; border: 1px solid #eee; border-radius: 12px; margin-top: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 20px 0 10px 0;"><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">Sent from your portfolio contact form</p>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Contact form error details:", {
      message: err.message,
      // @ts-expect-error: code property might not exist on all Error objects
      code: err.code,
      // @ts-expect-error: command property might not exist on all Error objects
      command: err.command
    });
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
