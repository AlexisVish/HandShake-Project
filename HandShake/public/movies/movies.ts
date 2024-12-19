interface IMovie {
  title: string;
  genre: string;
  director: string;
  year: number;
  rating: string;
  imageURL: string;
}

class MovieApp {
  private movieContainer: HTMLElement;
  private movies: IMovie[] = [];
  private myMovies: IMovie[] = [];
  private currentMovieIndex: number = 0;

  constructor(container: HTMLElement) {
    if (!container) {
      throw new Error("Movie container not found.");
    }
    this.movieContainer = container;
    this.init();
  }

  // Initialize the app by fetching movies and rendering the first movie
  private async init(): Promise<void> {
    await this.fetchMovies();
    if (this.movies.length) {
      this.renderMovie();
    } else {
      this.displayNoMoviesMessage();
    }
  }

  // Fetch movies from the server
  private async fetchMovies(): Promise<void> {
    try {
      const response = await fetch(
        "http://localhost:3000/api/movies/get-all-movies"
      );
      const data = await response.json();
      this.movies = data.movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Render the current movie
  private renderMovie(): void {
    this.movieContainer.innerHTML = ""; // Clear the container
    const movie = this.movies[this.currentMovieIndex];
    const movieCard = this.createMovieCard(movie);
    const buttonsContainer = this.createButtons();

    this.movieContainer.appendChild(movieCard);
    this.movieContainer.appendChild(buttonsContainer);
  }

  // Создание карточки фильма
  private createMovieCard(movie: IMovie): HTMLDivElement {
    const movieCard = document.createElement("div");
    movieCard.className = "card";

    movieCard.innerHTML = `
      <div class="card__image-wrapper">
        <img src="${movie.imageURL}" alt="${movie.title}" class="card__image">
      </div>
      <div class="card__info">
        <h2>${movie.title}</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
      </div>
    `;

    return movieCard;
  }

  // Create Yes and No buttons
  private createButtons(): HTMLDivElement {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";

    const yesButton = this.createButton("Yes", "yes-button", () =>
      this.handleYesClick()
    );
    const noButton = this.createButton("No", "no-button", () =>
      this.handleNoClick()
    );

    buttonsContainer.appendChild(yesButton);
    buttonsContainer.appendChild(noButton);

    return buttonsContainer;
  }

  // Create a reusable button
  private createButton(
    text: string,
    className: string,
    onClick: () => void
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
  }

  // Handle Yes button click
  private handleYesClick(): void {
    const movie = this.movies[this.currentMovieIndex];
    this.myMovies.push(movie);
    this.nextMovie();
  }

  // Handle No button click
  private handleNoClick(): void {
    this.nextMovie();
  }

  // Show the next movie or display a message if no more movies
  private nextMovie(): void {
    this.currentMovieIndex++;
    if (this.currentMovieIndex < this.movies.length) {
      this.renderMovie();
    } else {
      this.displayNoMoviesMessage();
    }
  }

  // Display a message when no more movies are available
  private displayNoMoviesMessage(): void {
    this.sendMyMoviesToServer(); // Отправляем фильмы на сервер

    this.movieContainer.innerHTML = `
      <div class="end-message">
        <p>No more movies to display.</p>
        <h2>Selected movies:</h2>
        <ul>
          ${this.myMovies.map((movie) => `<li>${movie.title}</li>`).join("")}
        </ul>
        <a href="/home/home.html" class="home-link">Go to Home</a>
      </div>
    `;
  }

  // Send the collected movies to the server
  private async sendMyMoviesToServer(): Promise<void> {
    // Extract userId and meetingId from cookies
    let userId: string | undefined; // Объявляем переменную вне блока

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.id; // Присваиваем значение
      console.log("Decoded User ID:", userId);
    } else {
      console.error("Token not found in cookies.");
    }

    // Теперь userId доступен в коде ниже
    if (!userId) {
      console.error(
        "User ID not found in cookies. Ensure the user is logged in."
      );
      return;
    }

    const meetingId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("meetingId="))
      ?.split("=")[1];

    if (!userId) {
      console.error(
        "User ID not found in cookies. Ensure the user is logged in."
      );
      return;
    }
    if (!meetingId) {
      console.error(
        "Meeting ID not found in cookies. Ensure the user is logged in."
      );
      return;
    }

    if (this.myMovies.length === 0) {
      console.log("No movies to send to the server.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/movies/add-movies-to-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            meetingId,
            myMovies: this.myMovies,
          }),
        }
      );

      if (response.ok) {
        console.log("Movies successfully sent to the server.");
      } else {
        console.error("Failed to send movies:", await response.text());
      }
    } catch (error) {
      console.error("Error sending movies to the server:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("movieContainer");
  if (!container) {
    console.error("Container not found!");
    return;
  }
  new MovieApp(container as HTMLElement);
});
