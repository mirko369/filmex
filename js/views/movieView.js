class MovieView {
  _parentEl = document.querySelector(".movie-box");
  _errMsg = "Sorry could not find movie you were looking for please try again";

  _generateMarkup(data) {
    let genre = "";
    data.genres.forEach((el) => {
      genre += `<p class="movie-genre">${el}</p>`;
    });

    return `
    <img class="movie-img" src="${data.image}" alt="Poster of movie">
    <div class="movie-info">
        <h2 class="movie-title">${data.title}</h2>
        <div class="movie-title-info">
            <div>
            <div class="align-icon">
                <p class="movie-title-year">${data.year} &dash; </p>
            <ion-icon name="time-outline" class="title-icon"></ion-icon>
            <p class="movie-title-time">${
              data.time ? data.time : "N/A"
            }</span></p>
        </div>
        </div>
        <div class="align-icon">
        <ion-icon name="star" class="title-icon star-icon"></ion-icon>
            <p class="movie-title-rating">${
              data.imdbRating ? `${data.imdbRating}/10` : "N/A"
            }</span></p>
        </div>
        </div>

        <div class="movie-awards-box">
          <div class="align-icon">
            <div class="icon-inner">
            <ion-icon class="rating-icon" name="podium-outline"></ion-icon>
          </div>
            <p class="movie-awards">${
              data.rated ? data.rated : "Movie is not in top 250"
            }</p>
          </div>
          <div class="align-icon">
            <div class="icon-inner">
            <ion-icon class="rating-icon" name="trophy-outline"></ion-icon>
          </div>
            <p class="movie-awards">${
              data.awards ? data.awards : "Movie has no awards"
            }</p>
          </div>
        </div>

        <div class="movie-genre-box">
          ${genre}
        </div>

        <div class="movie-like">
          <p class="like-text">Add to favorites to discover more movies like this one</p>
          <button class="like-btn"><ion-icon class="icon-heart ${
            data.like ? "liked" : ""
          }"name="heart"></ion-icon></button>
        </div>

    </div>

    <div class="movie-description">
      <p class="movie-plot">${data.plot}</p>
      <div class="movie-description-box">
      <div class="movie-makers">
      <p class="movie-maker"> <span class="movie-maker-span">Stars:</span>
        ${data.stars.join(",")}</p>
        <p class="movie-maker"><span class="movie-maker-span">Companies:</span>${
          data.companies
        }</p>
        <p class="movie-maker">
          <span class="movie-maker-span">Writer:</span >${
            data.writer ? data.writer : "N/A"
          }</p>
        <p class="movie-maker">
          <span class="movie-maker-span">Director:</span >${
            data.director ? data.director : "N/A"
          }</p>
        </div>
          <div class="watchlist">
            <p class="watchlist-text">Add to your watchlist</p>
            <button class="watchlist-btn">
              <ion-icon class="icon-bookmark ${
                data.watch ? "watch" : ""
              }"name="bookmark"></ion-icon>
            </button>
          </div>
        </div>
    </div>
    `;
  }

  renderMovie(data) {
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }

  renderError() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="error-message">${this._errMsg}</p>`
    );
  }

  addHandlerLike(handler) {
    document.querySelector(".like-btn").addEventListener("click", function () {
      document.querySelector(".icon-heart").classList.toggle("liked");
      handler();
    });
  }

  addHandlerWatchlist(handler) {
    document
      .querySelector(".watchlist-btn")
      .addEventListener("click", function () {
        document.querySelector(".icon-bookmark").classList.toggle("watch");
        handler();
      });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }
}

export default new MovieView();
