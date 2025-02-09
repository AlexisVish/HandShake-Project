class HomePage {
  private meetingId: string | null;
  private moviesListContainer: HTMLElement | null;

  constructor() {
    this.meetingId = this.getMeetingIdFromURL();
    this.moviesListContainer = document.getElementById("movies-list-container");

    if (!this.meetingId) {
      console.error("Meeting ID not found in URL.");
      return;
    }

    console.log("Meeting ID retrieved from URL:", this.meetingId);
    this.fetchCommonMovies();
  }

  // Extract Meeting ID from URL
  private getMeetingIdFromURL(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("meetingId");
  }

  // Fetch common movies from server
  private async fetchCommonMovies(): Promise<void> {
    try {
      if (!this.meetingId) {
        console.error("Cannot fetch movies without Meeting ID.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/meeting/common-movies/${this.meetingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Common Movies:", data.commonMovies);
      this.renderMovies(data.commonMovies);
    } catch (error) {
      console.error("Error fetching common movies:", error);
    }
  }

  // Render movie list
    
  private renderMovies(movies: string[]): void {
    if (!this.moviesListContainer) {
      console.error("Movies list container not found.");
      return;
    }

    this.moviesListContainer.innerHTML = `
      <h2>Common Movies:</h2>
      ${
        movies.length === 0
          ? `<p>No common movies available.</p>`
          : `<ul>
              ${movies
                .map((movie) => `<li>${movie}</li>`)
                .join("")}
            </ul>`
      }
    `;
  }
}

// Initialize the HomePage class when the page loads
document.addEventListener("DOMContentLoaded", () => new HomePage());
