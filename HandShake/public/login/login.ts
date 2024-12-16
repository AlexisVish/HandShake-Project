class LoginForm {
  createForm(): HTMLFormElement {
    const form = document.createElement("form");
    form.id = "form";
    form.innerHTML = `
      <div id='form__field'>
          <label for='email' id='form__label'>E-mail:</label>
          <input type='email' id='email' name='email' placeholder='Enter e-mail' required>
      </div>
      <div id='form__field'>
          <label for='password' id='form__label'>Password:</label>
          <input type='password' id='password' name='password' placeholder='Enter your password' required>
      </div>
      <div id='form__field'>
          <button type='submit' id='form__button'>Login</button>
      </div>
      `;
    return form;
  }
}

class FormValidator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= 6;
  }
}

async function submitLoginForm(event: Event) {
  try {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!FormValidator.isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!FormValidator.isValidPassword(password)) {
      throw new Error("Password must be at least 6 characters");
    }

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // ask the server for user details
      const userResponse = await fetch("http://localhost:3000/api/users/get-user", {
        method: "GET",
        credentials: "include", // for using cookies
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await userResponse.json();

      // greet the user by name and redirect to the meeting page
      alert(`Welcome, ${userData.name}`);
      form.reset();
      window.location.href = "/meeting/meeting.html";
    } else {
      const message = await response.text();
      throw new Error(message);
    }
  } catch (error) {
    alert(error.message);
  }
}

const appContainer = document.getElementById("app") as HTMLDivElement;
const loginForm = new LoginForm().createForm();
loginForm.addEventListener("submit", submitLoginForm);
appContainer.append(loginForm);
