interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

// class for creating login form
class LoginForm {
  createForm(): HTMLFormElement {
    const form = document.createElement("form");
    form.id = "form";
    form.innerHTML = `
        <div id='form__field'>
            <lable for='email' id='form__label'>E-mail:</lable>
            <input type='text' id='email' name='email' id='form__input' placeholder='Enter e-mail' required>
        </div>
        <div id='form__field'>
            <lable for='password' id='form__label'>Password:</lable>
            <input type='text' id='email' name='email' placeholder='Enter e-mail' required>
        </div>
        <div id='form__field'>
            <button type='submit' id='form__button'>Login</button>
        </div>
        `;
    return form;
  }
}

// class for validating email

class FormValidator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// function for submitting login form and sending data to the server
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

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user: IUser = await response.json();
      alert(`Welcome, ${user.name}`);
    } else {
      const message = await response.text();
      throw new Error(message);
    }
  } catch (error) {
    alert(error.message);
  }
}

// function for rendering login form
const appContainer = document.getElementById("app") as HTMLDivElement;
const loginForm = new LoginForm().createForm();
loginForm.addEventListener("submit", submitLoginForm);
appContainer.append(loginForm);
