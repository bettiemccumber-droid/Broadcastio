/**
 * 产品目录：按类别和关键词筛选。
 */
(function () {
  const state = { q: "", category: "All" };

  /**
   * 产品是否命中筛选。
   * @param {Object} product
   * @returns {boolean}
   */
  function matches(product) {
    if (state.category !== "All" && product.category !== state.category) return false;
    const query = state.q.trim().toLowerCase();
    if (!query) return true;
    const haystack = [
      product.name,
      product.category,
      product.summary,
      product.bestFor,
      product.verdict,
      product.description.join(" ")
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  /**
   * 重绘产品网格。
   * @returns {void}
   */
  function render() {
    const products = window.BROADCASTIO.products.filter(matches);
    const grid = document.getElementById("product-grid");
    const status = document.getElementById("result-status");
    if (!products.length) {
      grid.innerHTML = `<div class="empty"><p>No gear matched.</p><button class="text-btn" type="button" id="empty-clear">Clear filters</button></div>`;
      status.textContent = "Nothing on the bench matches.";
    } else {
      grid.innerHTML = products.map((product) => window.Site.productCard(product)).join("");
      const noun = products.length === 1 ? "piece" : "pieces";
      status.textContent = `Showing ${products.length} ${noun}.`;
    }
    document.querySelectorAll("#chips .chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", chip.dataset.category === state.category ? "true" : "false");
    });
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.category !== "All") params.set("category", state.category);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
    window.Site.watch(grid);
  }

  /**
   * 清空筛选。
   * @returns {void}
   */
  function resetFilters() {
    state.q = "";
    state.category = "All";
    document.getElementById("q").value = "";
    render();
  }

  /**
   * 绑定产品页筛选。
   * @returns {void}
   */
  function init() {
    const params = new URLSearchParams(window.location.search);
    state.q = params.get("q") || "";
    state.category = params.get("category") || "All";
    const names = ["All", ...new Set(window.BROADCASTIO.products.map((product) => product.category))];
    document.getElementById("chips").innerHTML = names.map((name) => {
      return `<button class="chip" type="button" data-category="${window.Site.escapeHtml(name)}">${window.Site.escapeHtml(name)}</button>`;
    }).join("");
    const search = document.getElementById("q");
    search.value = state.q;
    let timer = 0;
    search.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        state.q = search.value;
        render();
      }, 160);
    });
    document.getElementById("filters").addEventListener("submit", (event) => event.preventDefault());
    document.getElementById("chips").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      state.category = button.dataset.category;
      render();
    });
    document.getElementById("product-grid").addEventListener("click", (event) => {
      if (event.target.id === "empty-clear") resetFilters();
    });
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
