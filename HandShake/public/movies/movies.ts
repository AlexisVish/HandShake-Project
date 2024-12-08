import {IMovie} from "/workspaces/HandShake-Project/HandShake/src/models/movies/movieModel"

class MovieApp {
  private appContainer: HTMLElement;
  private movies: IMovie[] = [];
  private currentMovieIndex: number = 0;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error("App container not found");
    }
    this.appContainer = container;
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
    this.appContainer.innerHTML = ""; // Clear the container
    const movie = this.movies[this.currentMovieIndex];
    const movieCard = this.createMovieCard(movie);
    const buttonsContainer = this.createButtons();

    this.appContainer.appendChild(movieCard);
    this.appContainer.appendChild(buttonsContainer);
  }

  // Create the movie card
  private createMovieCard(movie: IMovie): HTMLDivElement {
    const movieCard = document.createElement("div");
    movieCard.className = "card";

    movieCard.innerHTML = `
      <img src="${movie.imageURL}" alt="${movie.title}" class="card__image">
      <h2 class="card__name">${movie.title}</h2>
      <p class="card__genre"><strong>Genre:</strong> ${movie.genre}</p>
      <p class="card__director"><strong>Director:</strong> ${movie.director}</p>
      <p class="card__year"><strong>Year:</strong> ${movie.year}</p>
      <p class="card__description"><strong>Description:</strong> ${movie.description}</p>
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
  private async handleYesClick(): Promise<void> {
    const movie = this.movies[this.currentMovieIndex];
    try {
      const response = await fetch(
        "http://localhost:3000/api/movies/add-my-movie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId: movie._id }),
        }
      );

      if (response.ok) {
        alert(`Movie added to favorites: ${movie.title}`);
      } else {
        console.error("Failed to add movie:", await response.text());
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }

const appContainer = document.getElementById('app');
const moviesContainer = document.createElement('div');
moviesContainer.className = 'movies';

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
    this.appContainer.innerHTML = `
      <p>No more movies to display. <a href="/home" class="home-link">Go to Home</a></p>
    `;
  }
}

async function fetchMovies() {
    const response = await fetch('http://localhost:3000/api/movies/get-all-movies');
    const { movies } = await response.json();
    return movies;
}

async function renderMovies() {
    const movies = await fetchMovies();
    moviesContainer.innerHTML = movies.map(movie => renderMovieCard(movie)).join('');
}


        
  


