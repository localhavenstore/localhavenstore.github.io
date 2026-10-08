// Oriel Street Bakehouse (demo): mark past / next bakes from the visitor's clock, and the demo-only form notice.
(function () {
  function shopNow() {                                      // the shop's own clock (UK), not the visitor's
    var p = {}, days = {Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6};
    new Intl.DateTimeFormat("en-GB", {timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false})
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return {day: days[p.weekday], h: +p.hour % 24, m: +p.minute};
  }
  var list = document.querySelector("[data-bakes]"), now = document.querySelector("[data-now]");
  try { if (list && now) {
    var d = shopNow(), mins = d.h * 60 + d.m, day = d.day, next = null;
    var open = day !== 1;                                   // closed on Mondays
    list.querySelectorAll("li").forEach(function (li) {
      var t = li.querySelector("time").textContent.split(":"), m = +t[0] * 60 + +t[1];
      if (!open) return;
      if (m + 45 < mins) li.classList.add("past");          // warm for about 45 minutes
      else if (!next) { next = li; li.classList.add("next"); }
    });
    if (!open || !next) {                                   // after the last bake / Mondays: show tomorrow's schedule, not a struck-out list
      list.querySelectorAll("li").forEach(function (li) { li.classList.remove("past"); });
      list.querySelector("li").classList.add("next");
      now.textContent = !open ? "Closed today (Monday). Tomorrow's bakes:" : day === 0 ? "Today's bakes are all out. We are closed on Monday - Tuesday's bakes:" : "Today's bakes are all out. Tomorrow's bakes:";
    }
    else {
      var t = next.querySelector("time").textContent, m = t.split(":"), diff = (+m[0] * 60 + +m[1]) - mins;
      now.textContent = diff <= 0 ? "Warm right now: " + next.textContent.replace(t, "").trim()
                                  : "Next out at " + t + " (in " + diff + " min)";
    }
  } } catch (err) { /* the static schedule stays as it is */ }
  var form = document.querySelector("[data-demo-form]");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();                                     // demo: never sent anywhere
    form.querySelector("[data-status]").textContent = "Demo only: this form is not connected. On a real site your request goes straight to the bakery's inbox.";
  });
  if (form) form.querySelectorAll("[data-enable]").forEach(function (b) { b.disabled = false; });   // only after the blocking handler exists
})();
