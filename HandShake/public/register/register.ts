interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

// class for creating registration form
class RegisterForm {
  createForm(): HTMLFormElement {
    const form = document.createElement("form");
    form.id = "form";
    form.innerHTML = `
      <div id="form__field">
        <label for="name" id="form__label">Name:</label>
        <input type="text" id="name" name="name" id="form__input" placeholder="Enter your name" required>
      </div>
      <div id="form__field">
        <label for="email" id="form__label">Email:</label>
        <input type="email" id="email" name="email" id="form__input" placeholder="Enter your email" required>
      </div>
      <div id="form__field">
        <label for="phone" id="form__label">Phone:</label>
        <input type="tel" id="phone" name="phone" id="form__input" placeholder="Enter your phone number" required>
      </div>
      <div id="form__field">
        <label for="password" id="form__label">Password:</label>
        <input type="password" id="password" name="password" id="form__input" placeholder="Enter your password" required>
      </div>
      <div id="form__field">
        <button type="submit" id="form__button">Register</button>
      </div>
    `;
    return form;
  }
}

// class for validating email and phone
class FormValidator {

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }
}

// function for submitting registration form and sending data to the server
async function submitRegistrationForm(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !phone || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }

    const data = await response.json();
    alert(`User ${data.name} registered successfully`);
    form.reset();
    window.location.href = "/login";
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed");
  }
}

// getting app container and adding registration form to it
const appContainer = document.getElementById("app");

if (appContainer) {
  const form = new RegisterForm().createForm();
  form.addEventListener("submit", submitRegistrationForm);
  appContainer.appendChild(form);
} else {
  console.error("App container not found");
}
