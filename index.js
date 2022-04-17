const API_KEY = "15749655e055b0d4573177b0aec90443";
const search = document.getElementById("search");
const form = document.getElementById("form");
const API_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const POPULAR_URL = `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_URL = `${API_URL}/search/movie?api_key=${API_KEY}&query=`;
const main = document.getElementById("main");

// getMovies(POPULAR_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` 
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
    ${overview}
    
  </div>`;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm != "") {
    getMovies(SEARCH_URL + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=15749655e055b0d4573177b0aec90443&page=1
