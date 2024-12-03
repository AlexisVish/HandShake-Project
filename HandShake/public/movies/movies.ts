interface IMovie {
  _id: string;
  name: string;
  director: string;
  year: number;
  imageUrl: string;
  genre: string;
  description: string;
}

class MovieApp {
  private appContainer: HTMLElement;
  private currentMovieIndex: number;
  private movies: IMovie[] = [];

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error("App container not found");
    }
    this.appContainer = container;
    this.currentMovieIndex = 0;

    this.init();
  }

  private async init() {
    await this.fetchMovies();
    if (this.movies.length) {
      this.renderMovie();
    } else {
      this.displayNoMoviesMessage();
    }
  }

  private async fetchMovies() {
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

  private renderMovie() {
    this.appContainer.innerHTML = ""; // Clear previous content

    const movie = this.movies[this.currentMovieIndex];
    const movieCard = this.createMovieCard(movie);
    const buttonsContainer = this.createButtons();

    this.appContainer.appendChild(movieCard);
    this.appContainer.appendChild(buttonsContainer);
  }

  private createMovieCard(movie: IMovie): HTMLDivElement {
    const movieCard = document.createElement("div");
    movieCard.className = "card";

    movieCard.innerHTML = `
      <img src="${movie.imageUrl}" alt="${movie.name}" class="card__image">
      <h2 class="card__name">${movie.name}</h2>
      <p class="card__genre"><strong>Genre:</strong> ${movie.genre}</p>
      <p class="card__director"><strong>Director:</strong> ${movie.director}</p>
      <p class="card__year"><strong>Year:</strong> ${movie.year}</p>
      <p class="card__description"><strong>Description:</strong> ${movie.description}</p>
    `;

    return movieCard;
  }

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

  private handleYesClick() {
    const movie = this.movies[this.currentMovieIndex];
    alert(`Movie added to favorites: ${movie.name}`);

    this.nextMovie();
  }

  private handleNoClick() {
    const movie = this.movies[this.currentMovieIndex];
    alert(`Movie skipped: ${movie.name}`);

    this.nextMovie();
  }

  private nextMovie() {
    this.currentMovieIndex++;
    if (this.currentMovieIndex < this.movies.length) {
      this.renderMovie();
    } else {
      this.displayNoMoviesMessage();
    }
  }

  private displayNoMoviesMessage() {
    this.appContainer.innerHTML = `
        <p>No more movies to display. <a href="/home" class="home-link">Go to Home</a></p>
    `;
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new MovieApp("app");
});
