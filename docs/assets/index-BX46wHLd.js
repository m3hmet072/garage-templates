(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();const _=document.getElementById("app"),l="".trim(),d="https://mkgfckxiusdcnqhethdy.functions.supabase.co".trim().replace(/\/+$/,""),b="981ddb30-5507-4128-8ece-3cfe1f32499e".trim(),S="".trim(),A="".trim(),P=typeof window<"u"&&["localhost","127.0.0.1"].includes(window.location.hostname),E=typeof window<"u"&&window.location.hostname.endsWith("github.io"),v=/\.functions\.supabase\.co$/i.test(d.replace(/^https?:\/\//i,"")),I=S||(v?"/contact":"/api/contact"),f=A||(v?"":"/health"),g=P||!E||!!d;let u=b;function y(e){return d?`${d}${e}`:e}_.innerHTML=`
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
`;const c=document.getElementById("contact-form"),h=document.getElementById("submit-btn"),p=document.getElementById("status");function k(){if(!l||typeof window>"u")return;window.dataLayer=window.dataLayer||[],window.gtag=window.gtag||function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",l,{send_page_view:!1});const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(l)}`,document.head.appendChild(e)}function o(e,n={}){!l||typeof window>"u"||typeof window.gtag!="function"||window.gtag("event",e,{...n,garage_id:u||"unknown"})}async function C(){if(!(!g||!f))try{const e=await fetch(y(f));if(!e.ok)return;const n=await e.json();u=typeof n.garage_id=="string"?n.garage_id:""}catch{u=b}}function s(e,n){p.textContent=n,p.className=e||""}function L(e){if(!e.name||e.name.length<2||e.name.length>100)return"Name must be between 2 and 100 characters.";const n=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.email||!n.test(e.email)||e.email.length>200?"A valid email address is required.":e.phone.length>40?"Phone must be 40 characters or fewer.":e.licensePlate.length>32?"License plate must be 32 characters or fewer.":e.service.length>120?"Service must be 120 characters or fewer.":!e.message||e.message.length<5||e.message.length>3e3?"Message must be between 5 and 3000 characters.":""}k();const w=()=>{o("page_view",{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname})};g?C().finally(w):w();c.addEventListener("submit",async e=>{if(e.preventDefault(),!c.reportValidity())return;const n=new FormData(c),r={name:String(n.get("name")||"").trim(),email:String(n.get("email")||"").trim(),phone:String(n.get("phone")||"").trim(),licensePlate:String(n.get("licensePlate")||"").trim(),service:String(n.get("service")||"").trim(),message:String(n.get("message")||"").trim(),website:String(n.get("website")||"").trim()},a=L(r);if(a){s("error",a);return}if(!g){s("error","Booking API is not configured for this deployment."),o("contact_submit_error",{service:r.service||"Contact Form",reason:"api_not_configured"});return}h.disabled=!0,s("","Sending..."),o("contact_submit_attempt",{service:r.service||"Contact Form"});try{const t=await fetch(y(I),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),i=await t.json().catch(()=>({}));if(!t.ok||!i.success)throw new Error(i.error||"Unable to send your request.");typeof i.garage_id=="string"&&i.garage_id.length>0&&(u=i.garage_id),c.reset(),s("success","Request sent. Our team will contact you shortly."),o("contact_submit_success",{service:r.service||"Contact Form"})}catch(t){const i=t instanceof TypeError;s("error",i?"Unable to reach booking API. Verify function URL and CORS settings.":t.message||"An unexpected error occurred."),o("contact_submit_error",{service:r.service||"Contact Form",reason:String(t.message||"unknown").slice(0,120)})}finally{h.disabled=!1}});
