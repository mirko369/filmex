import { KEY, RES_PER_PAGE } from "./config.js";
import { randomNum } from "./helpers.js";
import { TIMEOUT_SEC } from "./config.js";
import { timeout } from "./helpers.js";

export const state = {
  movie: {},
  search: {
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  watchlist: [],
  likes: [],
  discover: [],
};

function createMovieData(data) {
  return {
    rated: data.awards.includes("|") ? data.awards.split("|")[0] : undefined,
    awards: data.awards.includes("|") ? data.awards.split("|")[1] : data.awards,
    companies: data.companies,
    director: data.directors,
    genres: data.genres.split(","),
    id: data.id,
    imdbRating: data.imDbRating,
    image: data.image,
    keywords: data.keywords.split(","),
    plot: data.plot,
    time: data.runtimeMins,
    stars: data.stars.split(","),
    title: data.title,
    writer: data.writers,
    year: data.year,
    like: state.likes.some((el) => el.title === data.title) ? true : false,
    watch: state.watchlist.some((el) => el.title === data.title) ? true : false,
  };
}

export function createWatchlistData(movie) {
  return {
    title: movie.title,
    time: movie.time,
    imdbRating: movie.imdbRating,
    image: movie.image,
    watch: state.watchlist.some((el) => el.title === movie.title)
      ? true
      : false,
  };
}

export function createLikeData() {
  return {
    title: state.movie.title,
    keywords: state.movie.keywords,
    genres: state.movie.genres,
  };
}

function createDiscoverData(movie) {
  return {
    title: movie.title,
    time: movie.runtimeStr,
    imdbRating: movie.imDbRating,
    image: movie.image,
    plot: movie.plot,
    watch: state.watchlist.some((el) => el.title === data.title) ? true : false,
  };
}

export async function loadSearchMovies(input) {
  try {
    const promise = await Promise.race([
      fetch(`https://imdb-api.com/en/API/SearchMovie/${KEY}/${input}`),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await promise.json();
    state.search.results = data.results;
    if (!promise.ok) throw new Error(`${data.message} ${promise.status}`);
  } catch (err) {
    throw err;
  }
}

export async function loadMovie(id) {
  try {
    const promise = await Promise.race([
      fetch(`https://imdb-api.com/en/API/Title/${KEY}/${id}`),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await promise.json();
    state.movie = createMovieData(data);
    if (!promise.ok) throw new Error(`${data.message} ${promise.status}`);
  } catch (err) {
    throw err;
  }
}

export async function loadDiscoverMovie(genre, keyword) {
  try {
    const promise = await Promise.race([
      fetch(`
      https://imdb-api.com/API/AdvancedSearch/${KEY}?title_type=feature&genres=${genre}&keywords=${keyword}`),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await promise.json();
    state.search.results = data.results;
    if (!promise.ok) throw new Error(`${data.message} ${promise.status}`);
  } catch (err) {
    throw err;
  }
}

export async function discoverMovies() {
  if (state.likes.length < 1) return;
  state.discover = [];
  // for (let i = 0; i < 3; i++) {
  const keywordMovie = state.likes[randomNum(state.likes.length - 1)].keywords;
  const keyword = keywordMovie[randomNum(keywordMovie.length - 1)];
  const genreMovie = state.likes[randomNum(state.likes.length - 1)].genres;
  const genre = genreMovie[randomNum(genreMovie.length - 1)];
  await loadDiscoverMovie(genre, keyword);
  const data = state.search.results[randomNum(state.search.results.length - 1)];
  state.discover.push(createDiscoverData(data));
  // }
}

export function getPage() {
  return state.search.results.slice(
    (state.search.page - 1) * state.search.resultsPerPage,
    state.search.page * state.search.resultsPerPage
  );
}

export function saveData(type) {
  localStorage.setItem(type, JSON.stringify(state[type]));
}

export function getData(type) {
  const storage = localStorage.getItem(type);
  if (storage) state[type] = JSON.parse(storage);
}
