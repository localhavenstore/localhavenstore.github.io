// Ampere & Pipe Co. (demo): who answers the phone right now, a 3-step quote form, and the demo-only form notice.
(function () {
  function shopNow() {                                      // the shop's own clock (UK), not the visitor's
    var p = {}, days = {Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6};
    new Intl.DateTimeFormat("en-GB", {timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false})
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return {day: days[p.weekday], h: +p.hour % 24, m: +p.minute};
  }
  var s = document.querySelector("[data-status]");
  if (s) try {
    var d = shopNow(), h = d.h, wd = d.day >= 1 && d.day <= 5;
    s.textContent = wd && h >= 8 && h < 18 ? "Office open now - call or send a quote request."
                                           : "Office closed - the emergency line is on call now (+£60 call-out).";
  } catch (err) { /* keep the static hours text */ }
  var f = document.querySelector("[data-quote]");
  if (!f) return;
  var steps = [].slice.call(f.querySelectorAll("fieldset")), i = 0;
  var back = f.querySelector("[data-back]"), next = f.querySelector("[data-next]"), send = f.querySelector("[data-send]");
  var out = f.querySelector("[data-form-status]");
  f.classList.add("js-steps");
  function show() {
    steps.forEach(function (st, k) { st.classList.toggle("on", k === i); });
    back.hidden = i === 0; next.hidden = i === steps.length - 1; send.hidden = i !== steps.length - 1;
  }
  function valid() {
    var ok = true;
    steps[i].querySelectorAll("input,textarea,select").forEach(function (el) { if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; } });
    return ok;
  }
  next.addEventListener("click", function () { if (valid()) { i++; show(); steps[i].querySelector("input,textarea,select").focus(); } });
  back.addEventListener("click", function () { i--; show(); });
  f.addEventListener("submit", function (e) {
    e.preventDefault();                                     // demo: never sent anywhere
    out.textContent = "Demo only: this form is not connected. On a real site the request goes straight to the office inbox.";
  });
  show();
  send.disabled = false;                                    // only after the blocking handler exists
})();
