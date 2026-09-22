/* =========================================================
   Japranin – Kontaktformular (EmailJS)
   ---------------------------------------------------------
   WICHTIG: Tragen Sie unten Ihren EmailJS Public Key ein.
   Sie finden ihn im EmailJS Dashboard unter
   "Account" > "General" > "Public Key".
   ========================================================= */

(function () {
  "use strict";

  var PUBLIC_KEY = "LSA0KUh4NVX6Dumgj";
  var SERVICE_ID = "service_japraninbiz";
  var TEMPLATE_ID = "template_ilrgxwa";

  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  var status = document.getElementById("form-status");
  var submit = document.getElementById("contact-submit");

  if (typeof emailjs === "undefined") {
    console.error("EmailJS wurde nicht geladen.");
    return;
  }

  emailjs.init({ publicKey: PUBLIC_KEY });

  var setStatus = function (text, state) {
    if (!status) {
      return;
    }
    status.textContent = text;
    status.className = "form__status" + (state ? " is-" + state : "");
  };

  var value = function (id) {
    var field = document.getElementById(id);
    return field ? field.value.trim() : "";
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = value("name");
    var email = value("email");
    var number = value("number");
    var message = value("message");
    var consent = document.getElementById("consent");

    if (!name || !email || !number || !message) {
      setStatus("Bitte füllen Sie alle Felder aus.", "error");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("Bitte geben Sie eine gültige E-Mail-Adresse an.", "error");
      return;
    }

    if (consent && !consent.checked) {
      setStatus(
        "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu, um die Nachricht zu senden.",
        "error"
      );
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Wird gesendet …";
    }
    setStatus("Ihre Nachricht wird gesendet …");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        name: name,
        email: email,
        number: number,
        message: message
      })
      .then(function () {
        form.reset();
        setStatus(
          "Ihre Nachricht wurde gesendet. Wir melden uns zeitnah bei Ihnen.",
          "success"
        );
      })
      .catch(function (error) {
        console.error(error);
        setStatus(
          "Die Nachricht konnte nicht gesendet werden. Bitte rufen Sie uns an unter +49 172 9455169 oder schreiben Sie an japraninbiz@gmail.com.",
          "error"
        );
      })
      .finally(function () {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Nachricht senden";
        }
      });
  });
})();
