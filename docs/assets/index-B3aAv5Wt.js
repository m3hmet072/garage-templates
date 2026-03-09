(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const h=document.getElementById("app"),c="".trim();let d="";h.innerHTML=`
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
`;const s=document.getElementById("contact-form"),u=document.getElementById("submit-btn"),g=document.getElementById("status");function p(){if(!c||typeof window>"u")return;window.dataLayer=window.dataLayer||[],window.gtag=window.gtag||function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",c,{send_page_view:!1});const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(c)}`,document.head.appendChild(e)}function l(e,t={}){!c||typeof window>"u"||typeof window.gtag!="function"||window.gtag("event",e,{...t,garage_id:d||"unknown"})}async function f(){try{const t=await(await fetch("/health")).json();d=typeof t.garage_id=="string"?t.garage_id:""}catch{d=""}}function o(e,t){g.textContent=t,g.className=e||""}function w(e){if(!e.name||e.name.length<2||e.name.length>100)return"Name must be between 2 and 100 characters.";const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.email||!t.test(e.email)||e.email.length>200?"A valid email address is required.":e.phone.length>40?"Phone must be 40 characters or fewer.":e.licensePlate.length>32?"License plate must be 32 characters or fewer.":e.service.length>120?"Service must be 120 characters or fewer.":!e.message||e.message.length<5||e.message.length>3e3?"Message must be between 5 and 3000 characters.":""}p();f().finally(()=>{l("page_view",{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname})});s.addEventListener("submit",async e=>{if(e.preventDefault(),!s.reportValidity())return;const t=new FormData(s),a={name:String(t.get("name")||"").trim(),email:String(t.get("email")||"").trim(),phone:String(t.get("phone")||"").trim(),licensePlate:String(t.get("licensePlate")||"").trim(),service:String(t.get("service")||"").trim(),message:String(t.get("message")||"").trim(),website:String(t.get("website")||"").trim()},r=w(a);if(r){o("error",r);return}u.disabled=!0,o("","Sending..."),l("contact_submit_attempt",{service:a.service||"Contact Form"});try{const i=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await i.json().catch(()=>({}));if(!i.ok||!n.success)throw new Error(n.error||"Unable to send your request.");typeof n.garage_id=="string"&&n.garage_id.length>0&&(d=n.garage_id),s.reset(),o("success","Request sent. Our team will contact you shortly."),l("contact_submit_success",{service:a.service||"Contact Form"})}catch(i){o("error",i.message||"An unexpected error occurred."),l("contact_submit_error",{service:a.service||"Contact Form",reason:String(i.message||"unknown").slice(0,120)})}finally{u.disabled=!1}});
