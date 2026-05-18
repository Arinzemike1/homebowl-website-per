import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Waitlist API route
// POST /api/waitlist  — { email: string, role: "foodie" | "chef" }
//
// This route forwards submissions to your chosen free provider.
// See WAITLIST_SETUP.md at the project root for setup instructions.
//
// Required environment variables (set in .env.local):
//   WAITLIST_PROVIDER  — "loops" | "brevo" | "mailchimp"
//   WAITLIST_API_KEY   — API key from the chosen provider
//   BREVO_LIST_ID (Brevo only) — numeric list ID
//   MAILCHIMP_LIST_ID + MAILCHIMP_DC (Mailchimp only)
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

  const provider = process.env.WAITLIST_PROVIDER;
  const apiKey = process.env.WAITLIST_API_KEY;

  if (!provider || !apiKey) {
    // During development without env vars, just return success so the UI works.
    console.warn(
      "[waitlist] WAITLIST_PROVIDER or WAITLIST_API_KEY not set — skipping provider call.",
    );
    return NextResponse.json(
      { message: "Signed up successfully." },
      { status: 200 },
    );
  }

  try {
    if (provider === "loops") {
      await submitToLoops(email, role, apiKey);
    } else if (provider === "brevo") {
      await submitToBrevo(email, role, apiKey);
    } else if (provider === "mailchimp") {
      await submitToMailchimp(email, role, apiKey);
    } else {
      return NextResponse.json(
        { message: "Unknown WAITLIST_PROVIDER." },
        { status: 500 },
      );
    }
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

// --- Loops (loops.so) -------------------------------------------------------
async function submitToLoops(email: string, role: Role, apiKey: string) {
  const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      userGroup: role,
      source: "waitlist",
      subscribed: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Loops error ${res.status}: ${text}`);
  }
}

// --- Brevo (brevo.com) -------------------------------------------------------
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
    throw new Error(`Brevo error ${res.status}: ${text}`);
  }
}

// --- Mailchimp --------------------------------------------------------------
async function submitToMailchimp(email: string, role: Role, apiKey: string) {
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dc = process.env.MAILCHIMP_DC; // e.g. "us21"
  if (!listId || !dc)
    throw new Error("MAILCHIMP_LIST_ID or MAILCHIMP_DC is not set.");

  const res = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: { ROLE: role },
      }),
    },
  );

  // 400 with "Member Exists" is fine
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data.title !== "Member Exists") {
      throw new Error(
        `Mailchimp error ${res.status}: ${data.detail || JSON.stringify(data)}`,
      );
    }
  }
}
