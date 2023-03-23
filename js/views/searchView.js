class SearchView {
  _parentEl = document.querySelector(".movies-form");

  getInput() {
    const input = this._parentEl.querySelector(".search-form").value;
    this._clearInput();
    return input;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-form").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
