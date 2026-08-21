import { Resend } from "resend";

export async function POST(request) {
  try {
    // Kontrollera att API-nyckeln finns
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        {
          success: false,
          error: "RESEND_API_KEY saknas",
        },
        { status: 500 }
      );
    }

    // Skapa Resend-instansen först när endpointen anropas
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Läs informationen från formuläret
    const body = await request.json();

    const {
      firstname,
      lastname,
      email,
      phone,
      service,
      message,
    } = body;

    // Kontrollera obligatoriska fält
    if (!firstname || !lastname || !email || !message) {
      return Response.json(
        {
          success: false,
          error: "Namn, efternamn, email och meddelande måste fyllas i.",
        },
        { status: 400 }
      );
    }

    // Skicka email
    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["ninosmorad@gmail.com"],
      replyTo: email,
      subject: `Nytt meddelande från ${firstname} ${lastname}`,
      text: `
Nytt meddelande från din portfolio

Namn: ${firstname} ${lastname}
E-post: ${email}
Telefon: ${phone || "Inte angivet"}
Tjänst: ${service || "Inte angivet"}

Meddelande:
${message}
      `,
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Email error:", error);

    return Response.json(
      {
        success: false,
        error: "Kunde inte skicka meddelandet.",
      },
      { status: 500 }
    );
  }
}