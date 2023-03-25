import { state, getData, saveData } from "./model.js";
import watchlistView from "./views/watchlistView.js";

function controlWatchlist() {
  watchlistView.renderWatchlist(state.watchlist);
  watchlistView.addHandlerWatchlist(controlWatchlistBtn);
}

function controlWatchlistBtn(title) {
  const index = state.watchlist.findIndex((el) => el.title === title);
  state.watchlist.splice(index, 1);
  saveData("watchlist");
  controlWatchlist();
}

function init() {
  getData("watchlist");
  controlWatchlist();
}
init();
