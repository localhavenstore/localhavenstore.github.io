// Quayside Desk (demo): enable the one ticket animation (CSS, only with JS + no reduced motion) and the demo-only form notice.
(function () {
  document.documentElement.classList.add("js");
  var form = document.querySelector("[data-demo-form]");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();                                     // demo: never sent anywhere
    form.querySelector("[data-status]").textContent = "Demo only: this form is not connected. On a real site your message goes straight to the support team.";
  });
  if (form) form.querySelectorAll("[data-enable]").forEach(function (b) { b.disabled = false; });   // only after the blocking handler exists
})();
