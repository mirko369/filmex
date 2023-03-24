import { KEY, RES_PER_PAGE } from "./config.js";

export const state = {
  movie: {},
  search: {
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  watchlist: [],
  likes: [],
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
    like: state.likes.some(el => el.title === data.title) ? true : false,
    watch: state.watchlist.some(el => el.title === data.title) ? true : false,
  };
}

export async function loadSearchMovies(input) {
  try {
    const promise = await fetch(
      `https://imdb-api.com/en/API/SearchMovie/${KEY}/${input}`
    );
    const data = await promise.json();
    state.search.results = data.results;
    console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
}

export async function loadMovie(id) {
  try {
    const promise = await fetch(
      `https://imdb-api.com/en/API/Title/${KEY}/${id}`
    );
    const data = await promise.json();
    console.log(data);
    state.movie = createMovieData(data);
    console.log(state.movie);
  } catch (err) {
    console.error(err);
  }
}

export function getPage() {
  return state.search.results.slice(
    (state.search.page - 1) * state.search.resultsPerPage,
    state.search.page * state.search.resultsPerPage
  );
}
