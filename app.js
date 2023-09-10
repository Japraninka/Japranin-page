const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        number: document.getElementById("number").value,
        message: document.getElementById("message").value, // Corrected variable name
    };

    const serviceID = "service_japraninbiz";
    const templateID = "template_ilrgxwa";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("number").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Ihre Nachricht wurde erfolgreich gesendet");
        })
        .catch((err) => console.log(err));
}
