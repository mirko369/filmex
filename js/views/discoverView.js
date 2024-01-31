class DiscoverView {
  _parentEl = document.querySelector(".discover-box");
  _errMsg = "Sorry we did not find any movies please try again later";

  _generateMarkup(data) {
    return `
    <div class="movie">
            <p class="movie-title">${data.title}</p>
            <div class="movie-icons">
            <div class="align-icon">
          <ion-icon name="time-outline" class="title-icon"></ion-icon>
          <p class="movie-icons-text">${data.time}</span></p>
      </div>
            <div class="align-icon">
              <ion-icon name="star" class="title-icon star-icon"></ion-icon>
                  <p class="movie-icons-text">${
                    data.imdbRating ? `${data.imdbRating}/10` : "N/A"
                  }</span></p>
              </div>
          </div>
          <p class="movie-plot">${data.plot}</p>
          <img
              class="movie-img"
              src="${data.image}"
              alt="Picture of movie"
            />
            <button class="watchlist-btn" data-title="${data.title}">
              <ion-icon class="icon-bookmark" name="bookmark"></ion-icon>
            </button>
    </div>
    `;
  }

  renderError() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="error-message">${this._errMsg}</p>`
    );
  }

  renderDiscover(data) {
    this._clear();
    data.forEach((el) =>
      this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(el))
    );
  }

  renderSpinner() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `        <span class="loader"></span>`
    );
  }

  addHandlerWatchlist(handler) {
    document.querySelectorAll(".watchlist-btn").forEach((el) => {
      el.addEventListener("click", function (e) {
        const title = e.target.closest(".watchlist-btn").dataset.title;
        document.querySelector(".icon-bookmark").classList.toggle("watch");
        handler(title);
      });
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }
}

export default new DiscoverView();
