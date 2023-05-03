import {
  state,
  getData,
  discoverMovies,
  createWatchlistData,
  saveData,
} from "./model.js";
import discoverView from "./views/discoverView.js";

async function controlDiscover() {
  try {
    await discoverMovies();
    discoverView.renderDiscover(state.discover);
    discoverView.addHandlerWatchlist(controlWatchlistBtn);
  } catch (err) {
    discoverView.renderError();
    console.error(err);
  }
}

function controlWatchlistBtn(title) {
  const movie = state.discover.find((el) => el.title === title);
  console.log(movie);
  if (!movie.watch) state.watchlist.push(createWatchlistData(movie));
  if (movie.watch) {
    const index = state.watchlist.findIndex((el) => el.title === title);
    state.watchlist.splice(index, 1);
  }
  const movieWatch = state.watchlist.find((el) => el.title === title)?.watch;
  movie.watch = !movie.watch;
  if (movieWatch) movieWatch = !movieWatch;
  saveData("watchlist");
}

// function controlWatchlistBtn() {
//   if (!state.movie.watch) state.watchlist.push(createWatchlistData());
//   if (state.movie.watch) {
//     const index = state.watchlist.findIndex(
//       (el) => el.title === state.movie.title
//     );
//     state.watchlist.splice(index, 1);
//   }
//   state.movie.watch = !state.movie.watch;
//   saveData("watchlist");
// }

function init() {
  getData("likes");
  getData("watchlist");
  controlDiscover();
}

init();
