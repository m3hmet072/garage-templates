import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://m3hmet072.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

const REQUIRED_ENV_KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GARAGE_UUID"];

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getAllowedOrigins(): string[] {
  const raw = Deno.env.get("ALLOWED_ORIGINS") || "";
  if (!raw.trim()) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigins = getAllowedOrigins();
  const allowAll = allowedOrigins.includes("*");
  const resolvedOrigin = allowAll
    ? "*"
    : origin && allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0] || "*";

  return {
    "Access-Control-Allow-Origin": resolvedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function jsonResponse(status: number, body: Record<string, unknown>, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(origin),
      "Content-Type": "application/json"
    }
  });
}

function validatePayload(rawBody: unknown): { data: Record<string, string>; errors: string[] } {
  const body = typeof rawBody === "object" && rawBody !== null ? rawBody as Record<string, unknown> : {};

  const data = {
    name: normalizeString(body.name),
    email: normalizeString(body.email),
    phone: normalizeString(body.phone),
    licensePlate: normalizeString(body.licensePlate),
    service: normalizeString(body.service),
    message: normalizeString(body.message),
    website: normalizeString(body.website)
  };

  const errors: string[] = [];

  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    errors.push("Name must be between 2 and 100 characters.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email) || data.email.length > 200) {
    errors.push("A valid email address is required.");
  }

  if (data.phone.length > 40) {
    errors.push("Phone must be 40 characters or fewer.");
  }

  if (data.licensePlate.length > 32) {
    errors.push("License plate must be 32 characters or fewer.");
  }

  if (data.service.length > 120) {
    errors.push("Service must be 120 characters or fewer.");
  }

  if (!data.message || data.message.length < 5 || data.message.length > 3000) {
    errors.push("Message must be between 5 and 3000 characters.");
  }

  return { data, errors };
}

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin");

  if (request.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: getCorsHeaders(origin)
    });
  }

  if (request.method !== "POST") {
    return jsonResponse(405, { success: false, error: "Method Not Allowed" }, origin);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { success: false, error: "Invalid JSON body." }, origin);
  }

  const { data, errors } = validatePayload(payload);

  if (data.website) {
    return jsonResponse(200, { success: true }, origin);
  }

  if (errors.length > 0) {
    return jsonResponse(400, { success: false, error: errors[0] }, origin);
  }

  const config = {
    SUPABASE_URL: normalizeString(Deno.env.get("SUPABASE_URL")),
    SUPABASE_SERVICE_ROLE_KEY: normalizeString(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")),
    GARAGE_UUID: normalizeString(Deno.env.get("GARAGE_UUID"))
  };

  const missingConfig = REQUIRED_ENV_KEYS.filter((key) => !config[key as keyof typeof config]);
  if (missingConfig.length > 0) {
    return jsonResponse(500, { success: false, error: "Server configuration error." }, origin);
  }

  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const messageBlock = `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`;

  const row = {
    garage_id: config.GARAGE_UUID,
    license_plate: data.licensePlate || "CONTACT",
    phone: data.phone || "",
    service: data.service || "Contact Form",
    message: messageBlock
  };

  const { error } = await supabase.from("bookings").insert(row);
  if (error) {
    return jsonResponse(502, { success: false, error: "Failed to submit form. Please try again." }, origin);
  }

  return jsonResponse(200, { success: true }, origin);
});
