import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error("Contact form misconfigured: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "Server misconfigured." },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // swap once your domain is verified
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      // This is a REAL send failure (bad API key, unverified domain, etc.)
      // Log the full error so you can see exactly why.
      console.error("Resend rejected the send:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: error.message ?? "Failed to send." },
        { status: 500 }
      );
    }

    console.log("Email sent:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}