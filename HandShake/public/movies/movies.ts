interface IMovie {
    _id: string;
    name: string;
    director: string;
    year: number;
    imageUrl: string;
    genre: string;
    description: string;
    }

const appContainer = document.getElementById('app');
const moviesContainer = document.createElement('div');
moviesContainer.className = 'movies';

function renderMovieCard(movie: IMovie): HTMLDivElement {
    const movieCard = document.createElement('div');
    movieCard.className = 'card';
    movieCard.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.name}" class="card__image">
        <h2 class="card__name">${movie.name}</h2>
        <p class="card__genre">${movie.genre}</p>
        <p class="card__director">${movie.director}</p>
        <p class="card__year">${movie.year}</p>
        <p class="card__description">${movie.description}</p>
    `;
    return movieCard;
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


        
  


