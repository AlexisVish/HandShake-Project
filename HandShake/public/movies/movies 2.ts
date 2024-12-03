interface IMovie {
    _id: string;
    name: string;
    director: string;
    year: number;
    imageUrl: string;
    genre: string;
    description: string;
    }

const appConteiner = document.getElementById('app');

function renderMovieCard(movie: IMovie): HTMLDivElement {
    const movieCard = document.createElement('div');
    movieCard.className = 'card';
    movieCardard.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.name}" class="card__image">
        <h2 class="card__name">${movie.name}</h2>
        <p class="card__genre">${movie.genre}</p>
        <p class="card__director">${movie.director}</p>
        <p class="card__year">${movie.year}</p>
        <p class="card__description">${movie.description}</p>
    `;
    return card;
}

async function fetchMovies() {
    const response = await fetch('http://localhost:3000/api/movies/get-all-movies');
    const { movies } = await response.json();
    return movies;
}

async function renderMovies() {
    const movies = await fetchMovies();
    const movieCard.innerHTML = movies.map(movie: IMovie => createMovieCard(movie));
        
    });
}



