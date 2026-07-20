import { NextRequest, NextResponse } from "next/server";

// Swap this for Resend, Postmark, or any email provider.
// Docs: https://resend.com/docs/send-with-nextjs
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Example with Resend (requires RESEND_API_KEY env var + `npm install resend`):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "portfolio@yourdomain.com",
    //   to: "you@yourdomain.com",
    //   subject: `New message from ${name}`,
    //   replyTo: email,
    //   text: message,
    // });

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
