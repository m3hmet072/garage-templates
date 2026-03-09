(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const b=document.getElementById("app"),l="".trim(),m="https://mkgfckxiusdcnqhethdy.functions.supabase.co".trim().replace(/\/+$/,""),w="981ddb30-5507-4128-8ece-3cfe1f32499e".trim(),y=typeof window<"u"&&["localhost","127.0.0.1"].includes(window.location.hostname),_=typeof window<"u"&&window.location.hostname.endsWith("github.io"),g=y||!_||!!m;let d=w;function v(e){return m?`${m}${e}`:e}b.innerHTML=`
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
`;const c=document.getElementById("contact-form"),f=document.getElementById("submit-btn"),h=document.getElementById("status");function S(){if(!l||typeof window>"u")return;window.dataLayer=window.dataLayer||[],window.gtag=window.gtag||function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",l,{send_page_view:!1});const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(l)}`,document.head.appendChild(e)}function o(e,t={}){!l||typeof window>"u"||typeof window.gtag!="function"||window.gtag("event",e,{...t,garage_id:d||"unknown"})}async function k(){if(g)try{const e=await fetch(v("/health"));if(!e.ok)return;const t=await e.json();d=typeof t.garage_id=="string"?t.garage_id:""}catch{d=w}}function s(e,t){h.textContent=t,h.className=e||""}function P(e){if(!e.name||e.name.length<2||e.name.length>100)return"Name must be between 2 and 100 characters.";const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.email||!t.test(e.email)||e.email.length>200?"A valid email address is required.":e.phone.length>40?"Phone must be 40 characters or fewer.":e.licensePlate.length>32?"License plate must be 32 characters or fewer.":e.service.length>120?"Service must be 120 characters or fewer.":!e.message||e.message.length<5||e.message.length>3e3?"Message must be between 5 and 3000 characters.":""}S();const p=()=>{o("page_view",{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname})};g?k().finally(p):p();c.addEventListener("submit",async e=>{if(e.preventDefault(),!c.reportValidity())return;const t=new FormData(c),a={name:String(t.get("name")||"").trim(),email:String(t.get("email")||"").trim(),phone:String(t.get("phone")||"").trim(),licensePlate:String(t.get("licensePlate")||"").trim(),service:String(t.get("service")||"").trim(),message:String(t.get("message")||"").trim(),website:String(t.get("website")||"").trim()},r=P(a);if(r){s("error",r);return}if(!g){s("error","Booking API is not configured for this deployment."),o("contact_submit_error",{service:a.service||"Contact Form",reason:"api_not_configured"});return}f.disabled=!0,s("","Sending..."),o("contact_submit_attempt",{service:a.service||"Contact Form"});try{const i=await fetch(v("/api/contact"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await i.json().catch(()=>({}));if(!i.ok||!n.success)throw new Error(n.error||"Unable to send your request.");typeof n.garage_id=="string"&&n.garage_id.length>0&&(d=n.garage_id),c.reset(),s("success","Request sent. Our team will contact you shortly."),o("contact_submit_success",{service:a.service||"Contact Form"})}catch(i){s("error",i.message||"An unexpected error occurred."),o("contact_submit_error",{service:a.service||"Contact Form",reason:String(i.message||"unknown").slice(0,120)})}finally{f.disabled=!1}});
