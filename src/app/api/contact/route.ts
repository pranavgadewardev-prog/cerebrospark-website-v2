import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email content
    // await transporter.sendMail({
    //   from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_USER, // you receive it
    //   subject: `New Inquiry: ${subject}`,
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // 👈 show user's name
      replyTo: email, // 👈 VERY IMPORTANT (so you can reply directly)
      to: process.env.EMAIL_USER,
      subject: `New Inquiry: ${subject}`,
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#111827; padding:20px; text-align:center;">
        <h2 style="color:#facc15; margin:0;">Cerebrospark Innovations</h2>
        <p style="color:#d1d5db; font-size:14px; margin-top:5px;">
          New Website Inquiry
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:25px;">
        <h3 style="margin-bottom:20px; color:#111827;">Contact Details</h3>

        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:10px; font-weight:bold; color:#6b7280;">Name</td>
            <td style="padding:10px;">${name}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px; font-weight:bold; color:#6b7280;">Email</td>
            <td style="padding:10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold; color:#6b7280;">Phone</td>
            <td style="padding:10px;">${phone}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px; font-weight:bold; color:#6b7280;">Subject</td>
            <td style="padding:10px;">${subject}</td>
          </tr>
        </table>

        <!-- MESSAGE BOX -->
        <div style="margin-top:25px;">
          <h4 style="color:#111827;">Message</h4>
          <div style="background:#f9fafb; padding:15px; border-radius:8px; color:#374151;">
            ${message}
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="background:#111827; padding:15px; text-align:center;">
        <p style="color:#9ca3af; font-size:12px; margin:0;">
          © ${new Date().getFullYear()} Cerebrospark Innovations Pvt. Ltd.
        </p>
      </div>

    </div>
  </div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}