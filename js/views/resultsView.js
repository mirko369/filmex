class ResultsView {
  _parentEl = document.querySelector(".results-box");

  _generateMarkup(data) {
    return `<div class="movie-result" data-id="${data.id}">
  <img
    class="result-img"
    src="${data.image}"
    alt="Picture of movie"
  />
  <div class="result-text">
    <p class="result-title">${data.title}</p>
    <p class="result-description">
      ${data.description}
    </p>
  </div>
</div>`;
  }

  renderResults(data) {
    this._clear();
    data.forEach((el) => {
      this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(el));
    });
  }

  renderSpinner() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `        <span class="loader"></span>`
    );
  }

  addHandlerResults(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".movie-result");
      if (!btn) return;
      handler(btn.dataset.id);
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }
}

export default new ResultsView();
