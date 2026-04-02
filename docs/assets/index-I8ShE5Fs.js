(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const y=document.getElementById("app"),g=["apk","banden","airco","occasions","onderhoud","other"],S="https://mkgfckxiusdcnqhethdy.functions.supabase.co".trim();y.innerHTML=`
  <header class="topbar">
    <div class="container topbar-inner">
      <div class="brand">sas website</div>
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

          <fieldset class="service-fieldset" aria-required="true">
            <legend id="service-legend">Services</legend>
            <div class="services-grid" role="group" aria-labelledby="service-legend" aria-describedby="services-help">
              <label class="service-chip" for="service-apk">
                <input id="service-apk" name="services" type="checkbox" value="apk" />
                <span>apk</span>
              </label>
              <label class="service-chip" for="service-banden">
                <input id="service-banden" name="services" type="checkbox" value="banden" />
                <span>banden</span>
              </label>
              <label class="service-chip" for="service-airco">
                <input id="service-airco" name="services" type="checkbox" value="airco" />
                <span>airco</span>
              </label>
              <label class="service-chip" for="service-occasions">
                <input id="service-occasions" name="services" type="checkbox" value="occasions" />
                <span>occasions</span>
              </label>
              <label class="service-chip" for="service-onderhoud">
                <input id="service-onderhoud" name="services" type="checkbox" value="onderhoud" />
                <span>onderhoud</span>
              </label>
              <label class="service-chip" for="service-other">
                <input id="service-other" name="services" type="checkbox" value="other" aria-controls="service-other-wrap" aria-expanded="false" />
                <span>other</span>
              </label>
            </div>
            <p id="services-help" class="services-help">Select one or more services.</p>
            <div id="service-other-wrap" class="service-other" hidden>
              <label for="serviceOther">Other details (optional)</label>
              <input id="serviceOther" name="serviceOther" type="text" maxlength="70" placeholder="Describe your request" disabled />
            </div>
          </fieldset>

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
`;const l=document.getElementById("contact-form"),m=document.getElementById("submit-btn"),p=document.getElementById("status"),d=Array.from(l.querySelectorAll('input[name="services"]')),v=document.getElementById("service-other"),w=document.getElementById("service-other-wrap"),f=document.getElementById("serviceOther");function k(){return S.replace(/\/+$/,"")}function x(e){const i=e.startsWith("/")?e:`/${e}`,s=k();return s?`${s}${i}`:window.location.hostname.endsWith("github.io")?null:i}function o(e,i){p.textContent=i,p.className=e||""}function O(e){return e.replace(/,/g," ").replace(/\s+/g," ").trim()}function P(e,i){const s=new Set(e),a=O(i);return g.reduce((t,r)=>s.has(r)?r==="other"&&a?(t.push(`other: ${a}`),t):(t.push(r),t):t,[]).join(", ")}function u(){const i=d.some(s=>s.checked)?"":"Select at least one service.";d[0].setCustomValidity(i)}function b(){const e=v.checked;w.hidden=!e,f.disabled=!e,v.setAttribute("aria-expanded",String(e)),e||(f.value="")}function E(e){if(!e.name||e.name.length<2||e.name.length>100)return"Name must be between 2 and 100 characters.";const i=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.email||!i.test(e.email)||e.email.length>200?"A valid email address is required.":e.phone.length>40?"Phone must be 40 characters or fewer.":e.licensePlate.length>32?"License plate must be 32 characters or fewer.":e.service?e.service.length>120?"Service must be 120 characters or fewer.":!e.message||e.message.length<5||e.message.length>3e3?"Message must be between 5 and 3000 characters.":"":"Select at least one service."}d.forEach(e=>{e.addEventListener("change",()=>{u(),b()})});b();u();l.addEventListener("submit",async e=>{if(e.preventDefault(),u(),!l.reportValidity())return;const i=new FormData(l),s=i.getAll("services").map(n=>String(n)).filter(n=>g.includes(n)),a=String(i.get("serviceOther")||"").trim(),t={name:String(i.get("name")||"").trim(),email:String(i.get("email")||"").trim(),phone:String(i.get("phone")||"").trim(),licensePlate:String(i.get("licensePlate")||"").trim(),service:P(s,a),message:String(i.get("message")||"").trim(),website:String(i.get("website")||"").trim()},r=E(t);if(r){o("error",r);return}const c=x("/api/contact");if(!c){o("error","Contact API is not configured for this deployment.");return}m.disabled=!0,o("","Sending...");try{const n=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),h=await n.json().catch(()=>({}));if(!n.ok||!h.success)throw new Error(h.error||"Unable to send your request.");l.reset(),o("success","Request sent. Our team will contact you shortly.")}catch(n){o("error",n.message||"An unexpected error occurred.")}finally{m.disabled=!1}});
