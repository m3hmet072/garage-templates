import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(body: Record<string, unknown>) {
  const data = {
    name: normalizeString(body.name),
    email: normalizeString(body.email),
    phone: normalizeString(body.phone),
    licensePlate: normalizeString(body.licensePlate),
    service: normalizeString(body.service),
    message: normalizeString(body.message),
    website: normalizeString(body.website)
  };

  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    return { error: "Name must be between 2 and 100 characters.", data };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email) || data.email.length > 200) {
    return { error: "A valid email address is required.", data };
  }

  if (data.phone.length > 40) {
    return { error: "Phone must be 40 characters or fewer.", data };
  }

  if (data.licensePlate.length > 32) {
    return { error: "License plate must be 32 characters or fewer.", data };
  }

  if (data.service.length > 120) {
    return { error: "Service must be 120 characters or fewer.", data };
  }

  if (!data.message || data.message.length < 5 || data.message.length > 3000) {
    return { error: "Message must be between 5 and 3000 characters.", data };
  }

  return { error: "", data };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const garageId = Deno.env.get("GARAGE_UUID") || "";

  if (!supabaseUrl || !serviceRoleKey || !garageId) {
    return new Response(JSON.stringify({ success: false, error: "Function is not configured." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ success: false, error: "Invalid JSON body." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { data, error } = validatePayload(body);
  if (data.website) {
    return new Response(JSON.stringify({ success: true, garage_id: garageId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  if (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const messageBlock = `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`;

  const payload = {
    garage_id: garageId,
    license_plate: data.licensePlate || "CONTACT",
    phone: data.phone || "",
    service: data.service || "Contact Form",
    message: messageBlock
  };

  const { error: insertError } = await supabase.from("bookings").insert(payload);

  if (insertError) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to submit form. Please try again."
      }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }

  return new Response(JSON.stringify({ success: true, garage_id: garageId }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
