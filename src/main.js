import "./styles.css";

const app = document.getElementById("app");
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
const FALLBACK_GARAGE_ID = (import.meta.env.VITE_GARAGE_ID || "").trim();
const IS_LOCALHOST = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
const IS_GITHUB_PAGES_HOST = typeof window !== "undefined" && window.location.hostname.endsWith("github.io");
const hasApiAccess = IS_LOCALHOST || !IS_GITHUB_PAGES_HOST || Boolean(API_BASE_URL);
let activeGarageId = FALLBACK_GARAGE_ID;

function apiUrl(pathname) {
  return API_BASE_URL ? `${API_BASE_URL}${pathname}` : pathname;
}

app.innerHTML = `
  <header class="topbar">
    <div class="container topbar-inner">
      <div class="brand">TorqueLine Auto Care</div>
      <nav class="menu">
        <a href="#services">Services</a>
        <a href="#why">Why Us</a>
        <a href="#booking">Book</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="kicker">Same Day Diagnostics</p>
          <h1>Serious car care for everyday drivers</h1>
          <p class="lead">From brake repairs and engine diagnostics to full maintenance packages, our certified technicians keep your vehicle safe and road-ready.</p>
          <a href="#booking" class="cta">Book Your Visit</a>
        </div>
        <aside class="hero-card">
          <h2>Open Today</h2>
          <ul>
            <li>Mon-Fri: 08:00 - 18:00</li>
            <li>Sat: 09:00 - 15:00</li>
            <li>Sun: Closed</li>
          </ul>
          <p class="phone">Call: +1 (555) 014-9000</p>
        </aside>
      </div>
    </section>

    <section id="services" class="section">
      <div class="container">
        <h2>Core Services</h2>
        <div class="cards">
          <article class="card"><h3>Brake Systems</h3><p>Inspection, pads, rotors, and fluid replacement.</p></article>
          <article class="card"><h3>Engine Diagnostics</h3><p>Advanced scan tools to find faults fast and accurately.</p></article>
          <article class="card"><h3>Oil & Filter</h3><p>Premium oil change with multi-point safety check.</p></article>
          <article class="card"><h3>Suspension</h3><p>Shock, strut, and alignment correction for smooth handling.</p></article>
        </div>
      </div>
    </section>

    <section id="why" class="section alt">
      <div class="container split">
        <div>
          <h2>Why drivers trust TorqueLine</h2>
          <p>Transparent estimates, quality parts, and no rushed workmanship. We explain each fix in plain language before we start.</p>
        </div>
        <ul class="ticks">
          <li>Certified technicians</li>
          <li>12-month workmanship warranty</li>
          <li>Digital inspection reports</li>
          <li>Priority emergency slots</li>
        </ul>
      </div>
    </section>

    <section id="booking" class="section">
      <div class="container">
        <h2>Contact & Booking</h2>
        <form id="contact-form" class="form">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" required minlength="2" maxlength="100" />

          <label for="email">Email</label>
          <input id="email" name="email" type="email" required maxlength="200" />

          <label for="phone">Phone</label>
          <input id="phone" name="phone" type="tel" maxlength="40" />

          <label for="licensePlate">License Plate</label>
          <input id="licensePlate" name="licensePlate" type="text" maxlength="32" />

          <label for="service">Service</label>
          <input id="service" name="service" type="text" maxlength="120" placeholder="Brake Inspection" />

          <label for="message">Message</label>
          <textarea id="message" name="message" required minlength="5" maxlength="3000"></textarea>

          <div class="honeypot" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <button id="submit-btn" type="submit">Send Request</button>
          <p id="status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>
`;

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("status");

function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

function trackEvent(eventName, eventParams = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    ...eventParams,
    garage_id: activeGarageId || "unknown"
  });
}

async function fetchGarageId() {
  if (!hasApiAccess) {
    return;
  }

  try {
    const response = await fetch(apiUrl("/health"));
    if (!response.ok) {
      return;
    }

    const result = await response.json();
    activeGarageId = typeof result.garage_id === "string" ? result.garage_id : "";
  } catch (_error) {
    activeGarageId = FALLBACK_GARAGE_ID;
  }
}

function setStatus(type, text) {
  statusEl.textContent = text;
  statusEl.className = type || "";
}

function validatePayload(payload) {
  if (!payload.name || payload.name.length < 2 || payload.name.length > 100) {
    return "Name must be between 2 and 100 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailPattern.test(payload.email) || payload.email.length > 200) {
    return "A valid email address is required.";
  }

  if (payload.phone.length > 40) {
    return "Phone must be 40 characters or fewer.";
  }

  if (payload.licensePlate.length > 32) {
    return "License plate must be 32 characters or fewer.";
  }

  if (payload.service.length > 120) {
    return "Service must be 120 characters or fewer.";
  }

  if (!payload.message || payload.message.length < 5 || payload.message.length > 3000) {
    return "Message must be between 5 and 3000 characters.";
  }

  return "";
}

initAnalytics();

const trackPageView = () => {
  trackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

if (hasApiAccess) {
  fetchGarageId().finally(trackPageView);
} else {
  trackPageView();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    licensePlate: String(formData.get("licensePlate") || "").trim(),
    service: String(formData.get("service") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    website: String(formData.get("website") || "").trim()
  };

  const validationError = validatePayload(payload);
  if (validationError) {
    setStatus("error", validationError);
    return;
  }

  if (!hasApiAccess) {
    setStatus("error", "Booking API is not configured for this deployment.");
    trackEvent("contact_submit_error", {
      service: payload.service || "Contact Form",
      reason: "api_not_configured"
    });
    return;
  }

  submitBtn.disabled = true;
  setStatus("", "Sending...");
  trackEvent("contact_submit_attempt", {
    service: payload.service || "Contact Form"
  });

  try {
    const response = await fetch(apiUrl("/api/contact"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to send your request.");
    }

    if (typeof result.garage_id === "string" && result.garage_id.length > 0) {
      activeGarageId = result.garage_id;
    }

    form.reset();
    setStatus("success", "Request sent. Our team will contact you shortly.");
    trackEvent("contact_submit_success", {
      service: payload.service || "Contact Form"
    });
  } catch (error) {
    setStatus("error", error.message || "An unexpected error occurred.");
    trackEvent("contact_submit_error", {
      service: payload.service || "Contact Form",
      reason: String(error.message || "unknown").slice(0, 120)
    });
  } finally {
    submitBtn.disabled = false;
  }
});
