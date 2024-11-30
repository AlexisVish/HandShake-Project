var page1 = document.getElementById("page1");
page1.classList.add("main");
var greet = document.createElement("h1");
var regButton = document.createElement("button");
var logButton = document.createElement("button");
regButton.classList.add("btn");
logButton.classList.add("btn");
page1.append(greet, logButton, regButton);
greet.textContent = "Welcome!";
logButton.textContent = "Login";
regButton.textContent = "Registration";
logButton.addEventListener("click", handleLogin);
regButton.addEventListener("click", handleRegistration);
function handleLogin() {
    window.location.href = "/login/login.html";
}
function handleRegistration() {
    window.location.href = "/register/register.html";
}
