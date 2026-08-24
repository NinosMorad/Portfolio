import { Resend } from "resend";

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Kontrollera API-nyckeln
    if (!apiKey) {
      console.error("RESEND_API_KEY saknas i Vercel Environment Variables");

      return Response.json(
        {
          success: false,
          error: "RESEND_API_KEY saknas",
        },
        { status: 500 }
      );
    }

    console.log("RESEND_API_KEY finns");

    const resend = new Resend(apiKey);

    // Läs formuläret
    const body = await request.json();

    console.log("Form data received:", {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message ? "Finns" : "Saknas",
    });

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
          error:
            "Firstname, lastname, email och message måste fyllas i.",
        },
        { status: 400 }
      );
    }

    // Skicka email via Resend
    console.log("Försöker skicka email via Resend...");

    const { data, error } = await resend.emails.send({
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

    // Resend returnerade ett fel
    if (error) {
      console.error("RESEND ERROR:", error);

      return Response.json(
        {
          success: false,
          error: error.message || "Resend kunde inte skicka email.",
        },
        { status: 500 }
      );
    }

    console.log("Email skickat:", data);

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error?.message || "Okänt serverfel.",
      },
      { status: 500 }
    );
  }
}