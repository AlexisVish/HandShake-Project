async function fetchCommonMovies() {
  try {
    const response = await fetch("http://localhost:3000/api/meeting/common-movies");
    if (!response.ok) {
      throw new Error("Failed to fetch common movies");
    }

    const data = await response.json();
    const commonMovies = data.commonMovies;

    // Выводим фильмы на страницу
    const moviesList = document.getElementById("movies-list");
    if (moviesList) {
      commonMovies.forEach((movie: string) => {
        const li = document.createElement("li");
        li.textContent = movie;
        moviesList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error fetching common movies:", error);
  }
}

// Вызываем функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", fetchCommonMovies);
