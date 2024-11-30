const page1 = document.getElementById("page1")! as HTMLDivElement;
page1.classList.add("main");


const greet = document.createElement("h1")! as HTMLHeadingElement;
const regButton = document.createElement("button")! as HTMLButtonElement;
const logButton = document.createElement("button")! as HTMLButtonElement;
regButton.classList.add("btn");
logButton.classList.add("btn");

page1.append(greet, logButton, regButton);

greet.textContent="Welcome!";
logButton.textContent="Login";
regButton.textContent="Registration"

logButton.addEventListener("click", handleLogin)
regButton.addEventListener("click", handleRegistration)




function handleLogin(){
    window.location.href="/HandShake/public/login/login.html";
}

function handleRegistration(){
    window.location.href="/HandShake/public/register/register.html";
}


