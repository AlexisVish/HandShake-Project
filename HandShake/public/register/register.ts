// Define the User interface
interface iUser {
  _id?: string; // Optional for newly created users
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
}

// Create the main class
class RegistrationForm {
  [x: string]: any;
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
    form.classList.add("register-form");
    const heading = document.createElement("h1");
    heading.textContent = "Registration";
    heading.classList.add("form-title");

    form.append(
      heading,
      this.createInputField("Full Name", "text", "fullName"),
      this.createInputField("Email", "email", "email"),
      this.createInputField("Phone", "tel", "phone"),
      this.createInputField("Password", "password", "password"),
      this.createInputField("Confirm Password", "password", "confirmPassword"),
      this.createCheckboxField("I agree to the terms and conditions"),
      this.createSubmitButton()
    );

    form.addEventListener("submit", (event) => this.handleSubmit(event));
    return form;
  }

  // Create methods for creating fields
  private createInputField(
    labelText: string,
    type: string,
    name: string
  ): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", "name");

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
    input.name = "termsAgreed";
    input.id = "termsAgreed";
    input.required = true;

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", "termsAgreed");

    wrapper.append(input, label);
    return wrapper;
  }

  private createSubmitButton(): HTMLElement {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Register";
    button.classList.add("submit-button");
    return button;
  }

  // Handle form submission
  private handleSubmit(event: Event): void {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user: iUser = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      termsAgreed: !!formData.get("termsAgreed"),
    };

    if (this.validateData(user)) {
      this.sendDataToServer(user);
    } else {
      alert("Validation faild. Please check your input.");
    }
  }

  // Validate form data
  private validateData(user: iUser): boolean {
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  }

  // Send data to the server
  private async sendDataToServer(user: iUser): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Faild to register");
      }

      const data = await response.json();
      alert(`${data.message} Welcome ${data.user.fullName}!`);
      this.formElement.reset();
      window.location.href = "/login/login.html";
    } catch (error) {
      alert(error.message);
    }
  }
}

// Initialize the form
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = new RegistrationForm('app');
    registerForm.renderForm();
});
