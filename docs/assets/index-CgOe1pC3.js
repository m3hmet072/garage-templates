(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const b=document.getElementById("app"),f=["apk","banden","airco","occasions","onderhoud","other"];b.innerHTML=`
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
`;const c=document.getElementById("contact-form"),h=document.getElementById("submit-btn"),m=document.getElementById("status"),l=Array.from(c.querySelectorAll('input[name="services"]')),p=document.getElementById("service-other"),y=document.getElementById("service-other-wrap"),v=document.getElementById("serviceOther");function o(e,i){m.textContent=i,m.className=e||""}function S(e){return e.replace(/,/g," ").replace(/\s+/g," ").trim()}function w(e,i){const a=new Set(e),n=S(i);return f.reduce((t,r)=>a.has(r)?r==="other"&&n?(t.push(`other: ${n}`),t):(t.push(r),t):t,[]).join(", ")}function d(){const i=l.some(a=>a.checked)?"":"Select at least one service.";l[0].setCustomValidity(i)}function g(){const e=p.checked;y.hidden=!e,v.disabled=!e,p.setAttribute("aria-expanded",String(e)),e||(v.value="")}function k(e){if(!e.name||e.name.length<2||e.name.length>100)return"Name must be between 2 and 100 characters.";const i=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.email||!i.test(e.email)||e.email.length>200?"A valid email address is required.":e.phone.length>40?"Phone must be 40 characters or fewer.":e.licensePlate.length>32?"License plate must be 32 characters or fewer.":e.service?e.service.length>120?"Service must be 120 characters or fewer.":!e.message||e.message.length<5||e.message.length>3e3?"Message must be between 5 and 3000 characters.":"":"Select at least one service."}l.forEach(e=>{e.addEventListener("change",()=>{d(),g()})});g();d();c.addEventListener("submit",async e=>{if(e.preventDefault(),d(),!c.reportValidity())return;const i=new FormData(c),a=i.getAll("services").map(s=>String(s)).filter(s=>f.includes(s)),n=String(i.get("serviceOther")||"").trim(),t={name:String(i.get("name")||"").trim(),email:String(i.get("email")||"").trim(),phone:String(i.get("phone")||"").trim(),licensePlate:String(i.get("licensePlate")||"").trim(),service:w(a,n),message:String(i.get("message")||"").trim(),website:String(i.get("website")||"").trim()},r=k(t);if(r){o("error",r);return}h.disabled=!0,o("","Sending...");try{const s=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),u=await s.json().catch(()=>({}));if(!s.ok||!u.success)throw new Error(u.error||"Unable to send your request.");c.reset(),o("success","Request sent. Our team will contact you shortly.")}catch(s){o("error",s.message||"An unexpected error occurred.")}finally{h.disabled=!1}});
