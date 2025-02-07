class MeetingPage {
  private appContainer: HTMLElement;
  private formContainer: HTMLElement;
  private formElement: HTMLFormElement;
  private inputField: HTMLInputElement;
  private createButton: HTMLButtonElement;
  private joinButton: HTMLButtonElement;
  private userName: string = "User"; // Default name

  constructor(appId: string) {
    this.appContainer = document.getElementById(appId) as HTMLElement;
    if (!this.appContainer) {
      throw new Error("App container not found");
    }

    this.fetchUserName(); // Fetch user data
  }

  /**
   * Fetch user's full name from the server.
   */
  private async fetchUserName(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/api/users/get-user", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user name.");
      }

      const data = await response.json();
      this.userName = data.fullName || "User";
    } catch (error) {
      console.error("Error fetching user name:", error);
    } finally {
      this.renderPage();
    }
  }

  /**
   * Render the entire meeting page.
   */
  private renderPage(): void {
    this.formContainer = document.createElement("div");
    this.formContainer.classList.add("form-container");
    this.appContainer.appendChild(this.formContainer);

    this.renderWelcomeMessage();
    this.renderForm();
  }

  /**
   * Render the welcome message.
   */
  private renderWelcomeMessage(): void {
    const heading = document.createElement("h1");
    heading.textContent = `Welcome, ${this.userName}!`;
    heading.classList.add("form-title"); // Use correct class
    this.formContainer.appendChild(heading);
  }

  /**
   * Render the meeting form.
   */
  private renderForm(): void {
    this.formElement = document.createElement("form");
    this.formElement.classList.add("register-form");

    // Input field with label
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = "Meeting ID";
    label.setAttribute("for", "meetingId");

    this.inputField = document.createElement("input");
    this.inputField.type = "text";
    this.inputField.name = "meetingId";
    this.inputField.id = "meetingId";
    this.inputField.classList.add("form-input");
    this.inputField.placeholder =
      "Create a new meeting or enter an existing Meeting ID"; // Add placeholder

    formGroup.append(label, this.inputField);

    // Buttons
    this.createButton = this.createButtonElement("Create Meeting");
    this.joinButton = this.createButtonElement("Join Meeting");

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.append(this.joinButton, this.createButton);

    this.formElement.append(formGroup, buttonGroup);
    this.formContainer.appendChild(this.formElement);

    // Event listeners
    this.createButton.addEventListener("click", (event) =>
      this.handleMeeting(event, "create")
    );
    this.joinButton.addEventListener("click", (event) =>
      this.handleMeeting(event, "join")
    );
  }

  /**
   * Create a button element.
   */
  private createButtonElement(text: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.classList.add("submit-button");
    return button;
  }

  /**
   * Handle meeting actions (create/join).
   */
  private async handleMeeting(
    event: Event,
    action: "create" | "join"
  ): Promise<void> {
    event.preventDefault();
    const meetingId = this.inputField.value.trim();

    if (!meetingId) {
      alert("Please enter a valid Meeting ID.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/meeting/set-meeting",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ meetingId, action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create/join the meeting.");
      }

      const data = await response.json();
      alert(
        `Meeting ${action === "create" ? "created" : "joined"} successfully!`
      );
      window.location.href = `http://localhost:3000/movies/movies.html?meetingId=${meetingId}`;
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  }
}

// Initialize MeetingPage
document.addEventListener("DOMContentLoaded", () => {
  new MeetingPage("app");
});
