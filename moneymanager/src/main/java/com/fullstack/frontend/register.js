const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Hide all errors first
    document.querySelectorAll("small").forEach(error => {
        error.style.display = "none";
    });

    let valid = true;

    if (name.value.trim() === "") {
        document.getElementById("nameError").style.display = "block";
        valid = false;
    }

    if (email.value.trim() === "") {
        document.getElementById("emailError").style.display = "block";
        valid = false;
    }

    if (password.value.trim() === "") {
        document.getElementById("passwordError").style.display = "block";
        valid = false;
    }

    if (confirmPassword.value.trim() === "") {
        document.getElementById("confirmError").innerHTML = "Confirm Password is required";
        document.getElementById("confirmError").style.display = "block";
        valid = false;
    }
    else if (password.value !== confirmPassword.value) {
        document.getElementById("confirmError").innerHTML = "Passwords do not match";
        document.getElementById("confirmError").style.display = "block";
        valid = false;
    }

    if (valid) {
        alert("Registration Successful!");
        window.location.href = "login.html";
    }

});