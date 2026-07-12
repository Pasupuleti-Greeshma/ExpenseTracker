const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const savedPassword = localStorage.getItem("password") || "12345678";

    if (
        email === "greeshma@gmail.com" &&
        password === savedPassword
    ) {

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password");

    }
});