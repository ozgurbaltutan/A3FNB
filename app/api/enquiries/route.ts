import { NextResponse } from "next/server";
import { company } from "@/content/site";
import { enquiryEmailContent, validateEnquiryPayload } from "@/lib/enquiries";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "The request origin was not accepted." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Send the request as JSON." }, { status: 415 });
  }
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please wait before trying again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read." }, { status: 400 });
  }

  const result = validateEnquiryPayload(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message, fieldErrors: result.fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || company.email;
  if (!apiKey || !from) {
    console.error("Enquiry email is not configured. RESEND_API_KEY and ENQUIRY_FROM_EMAIL are required.");
    return NextResponse.json({ ok: false, message: "Email delivery is temporarily unavailable." }, { status: 503 });
  }

  const requestId = `A3-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const email = enquiryEmailContent(result.data, requestId);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: result.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const providerRequestId = response.headers.get("x-request-id");
    console.error("Resend enquiry delivery failed", { status: response.status, providerRequestId });
    return NextResponse.json({ ok: false, message: "The request could not be delivered. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, requestId }, { status: 202 });
}
