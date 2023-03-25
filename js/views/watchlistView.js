class WatchListView {
  _parentEl = document.querySelector(".watchlist-box");

  _generateMarkup(data) {
    return `<div class="movie">
          <p class="movie-title">${data.title}</p>
          <div class="movie-icons">
          <div class="align-icon">
        <ion-icon name="time-outline" class="title-icon"></ion-icon>
        <p class="movie-icons-text">${data.time ? data.time : "N/A"}</span></p>
    </div>
          <div class="align-icon">
            <ion-icon name="star" class="title-icon star-icon"></ion-icon>
                <p class="movie-icons-text">${
                  data.imdbRating ? `${data.imdbRating}/10` : "N/A"
                }</span></p>
            </div>
        </div>
        <img
            class="movie-img"
            src="${data.image}"
            alt="Picture of movie"
          />
          <button class="watchlist-btn" data-title="${data.title}">
            <ion-icon class="icon-bookmark ${
              data.watch ? "watch" : ""
            }" name="bookmark"></ion-icon>
          </button>
        </div>`;
  }

  renderWatchlist(data) {
    this._parentEl.innerHTML = "";
    data.forEach((el) => {
      this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(el));
    });
  }

  addHandlerWatchlist(handler) {
    document.querySelectorAll(".watchlist-btn").forEach((el) => {
      el.addEventListener("click", function (e) {
        const title = e.target.closest(".watchlist-btn").dataset.title;
        handler(title);
      });
    });
  }
}

export default new WatchListView();
