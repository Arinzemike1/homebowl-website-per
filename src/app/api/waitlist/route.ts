import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Waitlist API route
// POST /api/waitlist  — { email: string, role: "foodie" | "chef" }
//
// Required environment variables (set in .env.local):
//   BREVO_API_KEY   — Brevo API key (Settings > API Keys)
//   BREVO_LIST_ID   — Numeric contact list ID to add signups to
// ---------------------------------------------------------------------------

type Role = "foodie" | "chef";

interface RequestBody {
  email: string;
  role: Role;
}

export async function POST(req: NextRequest) {
  let body: RequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { email, role } = body;

  if (!email || !role) {
    return NextResponse.json(
      { message: "Email and role are required." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email address." },
      { status: 400 },
    );
  }

  if (!["foodie", "chef"].includes(role)) {
    return NextResponse.json(
      { message: "Role must be 'foodie' or 'chef'." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    // During development without env vars, just return success so the UI works.
    console.warn("[waitlist] BREVO_API_KEY not set — skipping provider call.");
    return NextResponse.json(
      { message: "Signed up successfully." },
      { status: 200 },
    );
  }

  try {
    await submitToBrevo(email, role, apiKey);
    await sendBrevoTransactional(email, role, apiKey);
  } catch (err) {
    console.error("[waitlist] Provider error:", err);
    return NextResponse.json(
      { message: "Failed to save your email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Signed up successfully." },
    { status: 200 },
  );
}

// --- Brevo: add contact to list --------------------------------------------
async function submitToBrevo(email: string, role: Role, apiKey: string) {
  const listId = process.env.BREVO_LIST_ID
    ? parseInt(process.env.BREVO_LIST_ID)
    : undefined;
  if (!listId) throw new Error("BREVO_LIST_ID is not set.");

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      attributes: { ROLE: role },
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  // 204 = already exists and updated, 201 = created
  if (res.status !== 201 && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Brevo contact error ${res.status}: ${text}`);
  }
}

// --- Brevo: send transactional welcome email --------------------------------
const BREVO_TEMPLATE_IDS: Record<Role, number> = {
  chef: 1,
  foodie: 2,
};

async function sendBrevoTransactional(
  email: string,
  role: Role,
  apiKey: string,
) {
  const templateId = BREVO_TEMPLATE_IDS[role];

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [{ email }],
      templateId,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo transactional error ${res.status}: ${text}`);
  }
}
