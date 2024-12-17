// Define the User interface for Login
interface iLoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Create the main Login class
class LoginForm {
  private appContainer: HTMLElement;
  private formContainer: HTMLElement;
  private formElement: HTMLFormElement;

  constructor(appId: string) {
    this.appContainer = document.getElementById(appId) as HTMLElement;
    if (!this.appContainer) {
      throw new Error("App container not found");
    }
    this.formContainer = document.createElement("div");
    this.formContainer.classList.add("form-container");
    this.appContainer.appendChild(this.formContainer);
  }

  public renderForm(): void {
    this.formElement = this.createFormElement();
    this.formContainer.appendChild(this.formElement);
  }

  // Create the form dynamically
  private createFormElement(): HTMLFormElement {
    const form = document.createElement("form");
    form.classList.add("register-form"); // Reuse same styles as Register

    // Heading
    const heading = document.createElement("h1");
    heading.textContent = "Login";
    heading.classList.add("form-title");

    form.append(
      heading,
      this.createInputField("Email", "email", "email"),
      this.createInputField("Password", "password", "password"),
      this.createCheckboxField("Remember Me"),
      this.createSubmitButton()
    );

    form.addEventListener("submit", (event) => this.handleSubmit(event));
    return form;
  }

  private createInputField(
    labelText: string,
    type: string,
    name: string
  ): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", name);

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = name;
    input.required = true;

    wrapper.append(label, input);
    return wrapper;
  }

  private createCheckboxField(labelText: string): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("checkbox-group");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "rememberMe";
    input.id = "rememberMe";

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", "rememberMe");

    wrapper.append(input, label);
    return wrapper;
  }

  private createSubmitButton(): HTMLElement {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Login";
    button.classList.add("submit-button");
    return button;
  }

  // Handle form submission
  private handleSubmit(event: Event): void {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user: iLoginUser = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: !!formData.get("rememberMe"),
    };

    this.sendDataToServer(user);
  }

  // Send data to the server
  private async sendDataToServer(user: iLoginUser): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include", // allow cookies in the request
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      // Save token if Remember Me is checked
      if (user.rememberMe && data.token) {
        localStorage.setItem("authToken", data.token); // Save token for client-side use
      }

      alert(`Welcome ${data.user.fullName}!`);
      window.location.href = "/meeting/meeting.html"; // Redirect after login
    } catch (error) {
      alert(error.message);
    }
  }
}

// Initialize the Login form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = new LoginForm("app");
  loginForm.renderForm();
});
