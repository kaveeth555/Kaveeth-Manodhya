import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Log the inquiry to console (production: connect to MongoDB / Resend / Nodemailer)
    console.log('📬 New contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // --- Extend here to save to MongoDB or send via email ---
    // Example (MongoDB):
    // const client = await clientPromise;
    // const db = client.db('portfolio');
    // await db.collection('inquiries').insertOne({ name, email, message, createdAt: new Date() });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
