import { loadSearchMovies, state, getPage, loadMovie } from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import movieView from "./views/movieView.js";

async function controlSearch() {
  try {
    await loadSearchMovies(searchView.getInput());

    resultsView.renderResults(getPage());
    paginationView.renderPagination(state.search.page);
  } catch (err) {
    console.error(err);
  }
}

async function controlResults(id) {
  await loadMovie(id);
  movieView.renderMovie(state.movie);
  // movieView.addHandlerLike(controlLike);
}

function controlPagination(page) {
  state.search.page = page;
  resultsView.renderResults(getPage());
  paginationView.renderPagination(state.search.page);
}

function controlLike() {
  if (!state.movie.like) state.likes.push(state.movie);
  if (state.movie.like) {
    const index = state.likes.findIndex((el) => el.title === state.movie.title);
    state.likes.splice(index, 1);
  }
  console.log(state.likes);
  state.movie.like = !state.movie.like;
}

function init() {
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  resultsView.addHandlerResults(controlResults);
}
init();
