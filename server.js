const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const APP_PORT = Number(process.env.PORT) || 5173;
const API_PORT = Number(process.env.API_PORT) || 8787;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();
const envFilePath = path.join(__dirname, ".env");

function getClientIp(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) || [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return false;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return true;
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(body) {
  const data = {
    name: normalizeString(body.name),
    email: normalizeString(body.email),
    phone: normalizeString(body.phone),
    licensePlate: normalizeString(body.licensePlate),
    service: normalizeString(body.service),
    message: normalizeString(body.message),
    website: normalizeString(body.website)
  };

  const errors = [];

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

function getRuntimeConfig() {
  try {
    const fileContent = fs.readFileSync(envFilePath, "utf8");
    const parsed = dotenv.parse(fileContent);
    return {
      SUPABASE_URL: parsed.SUPABASE_URL || process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: parsed.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
      GARAGE_UUID: parsed.GARAGE_UUID || process.env.GARAGE_UUID
    };
  } catch (_err) {
    return {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      GARAGE_UUID: process.env.GARAGE_UUID
    };
  }
}

function getSupabaseAdmin(config) {
  const supabaseUrl = config.SUPABASE_URL;
  const serviceRoleKey = config.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function getMissingConfigKeys(config) {
  const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GARAGE_UUID"];
  return required.filter((key) => !config[key]);
}

app.post("/api/contact", async (req, res) => {
  const runtimeConfig = getRuntimeConfig();
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: "Too many submissions. Please try again later."
    });
  }

  const { data, errors } = validatePayload(req.body || {});
  const garageId = runtimeConfig.GARAGE_UUID;

  if (data.website) {
    return res.status(200).json(
      isProduction ? { success: true } : { success: true, garage_id: garageId }
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors[0]
    });
  }

  const missingConfig = getMissingConfigKeys(runtimeConfig);
  if (missingConfig.length > 0) {
    return res.status(500).json({
      success: false,
      error: "Server configuration error.",
      ...(isProduction ? {} : { missing: missingConfig })
    });
  }

  const supabase = getSupabaseAdmin(runtimeConfig);
  if (!supabase) {
    return res.status(500).json({
      success: false,
      error: "Server configuration error.",
      ...(isProduction ? {} : { missing: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] })
    });
  }

  const messageBlock = `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`;

  const payload = {
    garage_id: garageId,
    license_plate: data.licensePlate || "CONTACT",
    phone: data.phone || "",
    service: data.service || "Contact Form",
    message: messageBlock
  };

  try {
    const { error } = await supabase.from("bookings").insert(payload);

    if (error) {
      return res.status(502).json({
        success: false,
        error: "Failed to submit form. Please try again."
      });
    }

    return res.status(200).json(
      isProduction ? { success: true } : { success: true, garage_id: garageId }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Unexpected server error."
    });
  }
});

app.get("/health", (_req, res) => {
  const runtimeConfig = getRuntimeConfig();
  res.json({
    ok: true,
    mode: isProduction ? "production" : "development",
    ...(isProduction ? {} : { garage_id: runtimeConfig.GARAGE_UUID || null })
  });
});

if (isProduction) {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const listenPort = isProduction ? APP_PORT : API_PORT;

app.listen(listenPort, () => {
  console.log(`API listening on http://localhost:${listenPort}`);
});
