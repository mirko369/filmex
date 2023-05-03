import {
  loadSearchMovies,
  state,
  getPage,
  loadMovie,
  saveData,
  getData,
  createWatchlistData,
  createLikeData,
} from "./model.js";
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
    movieView.renderError();
  }
}

async function controlResults(id) {
  try {
    await loadMovie(id);
    movieView.renderMovie(state.movie);
    movieView.addHandlerLike(controlLikeBtn);
    movieView.addHandlerWatchlist(controlWatchlistBtn);
  } catch (err) {
    console.error(err);
    movieView.renderError();
  }
}

function controlPagination(page) {
  state.search.page = page;
  resultsView.renderResults(getPage());
  paginationView.renderPagination(state.search.page);
}

function controlLikeBtn() {
  if (!state.movie.like) state.likes.push(createLikeData());
  if (state.movie.like) {
    const index = state.likes.findIndex((el) => el.title === state.movie.title);
    state.likes.splice(index, 1);
  }
  state.movie.like = !state.movie.like;
  saveData("likes");
}

function controlWatchlistBtn() {
  if (!state.movie.watch)
    state.watchlist.push(createWatchlistData(state.movie));
  if (state.movie.watch) {
    const index = state.watchlist.findIndex(
      (el) => el.title === state.movie.title
    );
    state.watchlist.splice(index, 1);
  }
  state.movie.watch = !state.movie.watch;
  saveData("watchlist");
}

function init() {
  getData("likes");
  getData("watchlist");
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  resultsView.addHandlerResults(controlResults);
}
init();
