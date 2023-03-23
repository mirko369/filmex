class PaginationView {
  _parentEl = document.querySelector(".results-box");

  _generateMarkup(page) {
    let markup = "";
    if (page === 1) {
      markup = `<div class="page-btns">
<button class="pagination-btn right-btn">Page 2</button>
</div>`;
    }
    if (page === 5) {
      markup = `
      <div class="page-btns">
            <button class="pagination-btn left-btn">Page 4</button>
        </div>`;
    }
    if (page > 1 && page < 5) {
      markup = `
      <div class="page-btns">
            <button class="pagination-btn left-btn">Page ${page - 1}</button>
            <button class="pagination-btn right-btn">Page ${page + 1}</button>
        </div>`;
    }
    return markup;
  }

  renderPagination(page) {
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(page));
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;
      const page = +btn.textContent.slice(-1);
      handler(page);
    });
  }
}

export default new PaginationView();
