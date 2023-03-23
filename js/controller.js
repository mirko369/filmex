import { loadSearchMovies, state, getPage, loadMovie } from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

async function controlSearch() {
  try {
    await loadSearchMovies(searchView.getInput());

    resultsView.renderResults(getPage());
    paginationView.renderPagination(state.search.page);
  } catch (err) {
    console.error(err);
  }
}

function controlResults(id) {
  loadMovie(id);
}

function controlPagination(page) {
  state.search.page = page;
  resultsView.renderResults(getPage());
  paginationView.renderPagination(state.search.page);
}

function init() {
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  resultsView.addHandlerResults(controlResults);
}
init();
