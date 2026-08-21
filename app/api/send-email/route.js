import { Resend } from 'resend';

export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();

    const { name, email, message } = body;

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["din-email@example.com"],
      subject: `Nytt meddelande från ${name}`,
      replyTo: email,
      text: message,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "Kunde inte skicka meddelandet" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  // Verify API key
  if (!process.env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), { status: 400 });
  }

  const { firstname, lastname, email, phone, service, message } = body;

  // Validate required fields
  if (!firstname || !lastname || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Ensure this is a verified domain
      to: 'ninosmorad@gmail.com',
      subject: `New message from ${firstname} ${lastname}`,
      text: `
        Namn: ${firstname} ${lastname}
        E-post: ${email}
        Telefon: ${phone}
        Tjänst: ${service}

        Meddelande:
        ${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email error:', error.message, error);
    return new Response(JSON.stringify({ error: 'Could not send email', details: error.message }), { status: 500 });
  }
}