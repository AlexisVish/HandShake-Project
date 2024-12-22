class MeetingPage {
  private inputField: HTMLInputElement;
  private createButton: HTMLButtonElement;
  private joinButton: HTMLButtonElement;

  constructor() {
    this.inputField = document.querySelector(
      ".input-field"
    ) as HTMLInputElement;
    this.createButton = document.querySelector(
      ".button-group button:nth-child(2)"
    ) as HTMLButtonElement;
    this.joinButton = document.querySelector(
      ".button-group button:nth-child(1)"
    ) as HTMLButtonElement;

    // add event listeners
    this.createButton.addEventListener("click", () =>
      this.handleMeeting("create")
    );
    this.joinButton.addEventListener("click", () => this.handleMeeting("join"));
  }

  private async handleMeeting(action: "create" | "join"): Promise<void> {
    const meetingId = this.inputField.value.trim();
    console.log("Meeting ID before redirect:", meetingId); // Отладка

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
          credentials: "include", // send cookies
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

      // move to the movies page with the meetingId
      window.location.href = `http://localhost:3000/movies/movies.html?meetingId=${meetingId}`;
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  }
}

// Initialize the MeetingPage class
document.addEventListener("DOMContentLoaded", () => {
  new MeetingPage();
});
