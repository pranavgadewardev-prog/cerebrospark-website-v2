import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Brochure mapping
const brochureMap: Record<string, string[]> = {
  CS_KRISHI_10L: [
    "cs-krishi-english.pdf",
    "cs-krishi-marathi.pdf",
  ],
  "CS-MAMBA": ["cs-mamba.pdf"],
  "CS-PRIDE": ["cs-pride.pdf"],
  "CS-BHEEM": ["cs-bheem.pdf"],
};

export async function POST(req: Request) {
  try {
    console.log("🚀 API HIT");

    const body = await req.json();

    // 🔥 TRIM INPUTS (IMPORTANT)
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const state = body.state?.trim();
    const city = body.city?.trim();
    const brochureType = body.brochureType;

    console.log("📥 Incoming:", { name, email, brochureType });

    // =========================
    // ✅ VALIDATION FUNCTIONS
    // =========================
    const validateName = (name: string) =>
      /^[A-Za-z\s]{2,50}$/.test(name);

    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePhone = (phone: string) =>
      /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone);

    const validateTextField = (value: string) =>
      /^[A-Za-z\s]{2,50}$/.test(value);

    // =========================
    // ❌ REQUIRED CHECK
    // =========================
    if (!name || !email || !phone || !state || !city || !brochureType) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // =========================
    // ❌ FIELD VALIDATIONS
    // =========================
    if (!validateName(name)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid name format",
        },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number",
        },
        { status: 400 }
      );
    }

    if (!validateTextField(state)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid state",
        },
        { status: 400 }
      );
    }

    if (!validateTextField(city)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid city",
        },
        { status: 400 }
      );
    }

    // =========================
    // ✅ VALIDATE BROCHURE TYPE
    // =========================
    const files = brochureMap[brochureType];

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid brochure type",
        },
        { status: 400 }
      );
    }

    // =========================
    // ✅ SAVE TO DB
    // =========================
    const { error } = await supabase.from("brochure_downloads").insert([
      {
        name,
        email,
        phone,
        state,
        city,
        brochure_type: brochureType,
      },
    ]);

    if (error) {
      console.error("❌ Supabase Error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    console.log("✅ Data saved");

    // ✅ FAST RESPONSE
    const response = NextResponse.json({ success: true });

    // =========================
    // 📧 BACKGROUND EMAIL
    // =========================
    setImmediate(async () => {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Drone Brochure",
          html: `
            <h2>Hello ${name},</h2>

            <p>Thank you for your interest in <b>${brochureType}</b>.</p>

            <p>You can download your brochure(s) below:</p>

            ${files
              .map(
                (file) => `
                  <p>
                    <a href="${baseUrl}/storage/v1/object/public/brochures/${file}" 
                       style="color:#2563eb;font-weight:bold;">
                       Download ${file.replace(".pdf", "").replace(/-/g, " ").toUpperCase()}
                    </a>
                  </p>
                `
              )
              .join("")}

            <br/>
            <p>Regards,<br/>Team Cerebrospark</p>
          `,
        });

        console.log("✅ Email sent to:", email);
      } catch (err) {
        console.error("❌ Email Error:", err);
      }
    });

    return response;
  } catch (error) {
    console.error("❌ Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}