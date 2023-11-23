function sendMail() {
    // Get the values of the input fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var message = document.getElementById("message").value;

    // Check if any of the required fields is empty

    if (!name.trim() || !email.trim() || !number.trim() || !message.trim()) {
        alert("Bitte füllen Sie alle nötige Felder aus.");
        return;
    }




    // All required fields are filled, proceed with sending the email
    var params = {
        name: name,
        email: email,
        number: number,
        message: message,
    };

    const serviceID = "service_japraninbiz";
    const templateID = "template_ilrgxwa";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            // Clear the input fields after sending the email
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("number").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Ihre Nachricht wurde erfolgreich gesendet");
        })
        .catch((err) => console.log(err));
}
