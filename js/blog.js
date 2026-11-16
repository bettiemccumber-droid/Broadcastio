/**
 * 期刊列表：分类、搜索、分页，以及按日期排序。
 */
(function () {
  const PAGE_SIZE = 6;
  const state = {
    q: "",
    category: "All",
    sort: "newest",
    page: 1
  };

  /**
   * 从地址栏恢复筛选状态。
   * @returns {void}
   */
  function readFromUrl() {
    const params = new URLSearchParams(window.location.search);
    state.q = params.get("q") || "";
    state.category = params.get("category") || "All";
    state.sort = params.get("sort") === "oldest" ? "oldest" : "newest";
    const page = Number.parseInt(params.get("page") || "1", 10);
    state.page = Number.isFinite(page) && page > 0 ? page : 1;
  }

  /**
   * 把筛选状态写回地址栏。
   * @returns {void}
   */
  function writeUrl() {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.category !== "All") params.set("category", state.category);
    if (state.sort !== "newest") params.set("sort", state.sort);
    if (state.page > 1) params.set("page", String(state.page));
    const query = params.toString();
    const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }

  /**
   * 文章是否命中当前分类和搜索词。
   * @param {Object} article
   * @returns {boolean}
   */
  function matches(article) {
    if (state.category !== "All" && article.category !== state.category) return false;
    const query = state.q.trim().toLowerCase();
    if (!query) return true;
    const body = article.body.map((block) => {
      if (block.text) return block.text;
      if (block.items) return block.items.join(" ");
      if (block.caption) return block.caption;
      return "";
    }).join(" ");
    const haystack = [article.title, article.dek, article.excerpt, article.category, article.tags.join(" "), body]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  }

  /**
   * 绘制分类按钮的按下状态。
   * @returns {void}
   */
  function paintChips() {
    document.querySelectorAll("#chips .chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", chip.dataset.category === state.category ? "true" : "false");
    });
  }

  /**
   * 生成分页按钮。
   * @param {number} page
   * @param {number} pages
   * @returns {string}
   */
  function pagerHtml(page, pages) {
    if (pages <= 1) return "";
    let html = `<button type="button" data-page="${page - 1}" ${page === 1 ? "disabled" : ""}>Previous</button>`;
    for (let index = 1; index <= pages; index += 1) {
      html += `<button type="button" data-page="${index}" ${index === page ? 'aria-current="page"' : ""}>${index}</button>`;
    }
    html += `<button type="button" data-page="${page + 1}" ${page === pages ? "disabled" : ""}>Next</button>`;
    return html;
  }

  /**
   * 按当前状态重绘列表。
   * @param {{scroll?: boolean}} [options]
   * @returns {void}
   */
  function render(options) {
    const articles = window.BROADCASTIO.articles.filter(matches);
    const sorted = window.Site.sortByDate(articles, state.sort);
    const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PAGE_SIZE;
    const slice = sorted.slice(start, start + PAGE_SIZE);
    const grid = document.getElementById("card-grid");
    const status = document.getElementById("result-status");
    const pager = document.getElementById("pager");
    const clear = document.getElementById("clear");
    const filtered = state.q || state.category !== "All" || state.sort !== "newest";

    if (!slice.length) {
      grid.innerHTML = `<div class="empty"><p>No pieces matched.</p><button class="text-btn" type="button" id="empty-clear">Clear filters</button></div>`;
    } else {
      grid.innerHTML = slice.map((article) => window.Site.articleCard(article)).join("");
    }

    const end = slice.length ? start + slice.length : 0;
    const sortLabel = state.sort === "oldest" ? "oldest first" : "newest first";
    if (!sorted.length) {
      status.textContent = state.q
        ? `No pieces matched “${state.q.trim()}”.`
        : "No pieces in this desk.";
    } else {
      status.textContent = `Showing ${start + 1}–${end} of ${sorted.length}, ${sortLabel}.`;
    }

    pager.innerHTML = pagerHtml(state.page, pages);
    clear.hidden = !filtered;
    paintChips();
    writeUrl();
    window.Site.watch(grid);
    if (options && options.scroll) {
      document.getElementById("journal-top").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**
   * 恢复默认筛选。
   * @returns {void}
   */
  function resetFilters() {
    state.q = "";
    state.category = "All";
    state.sort = "newest";
    state.page = 1;
    document.getElementById("q").value = "";
    document.getElementById("sort").value = "newest";
    render();
  }

  /**
   * 绑定搜索、分类、排序和分页。
   * @returns {void}
   */
  async function init() {
    readFromUrl();
    const chips = document.getElementById("chips");
    const names = ["All", ...window.BROADCASTIO.categories.map((category) => category.name)];
    chips.innerHTML = names.map((name) => {
      return `<button class="chip" type="button" data-category="${window.Site.escapeHtml(name)}">${window.Site.escapeHtml(name)}</button>`;
    }).join("");

    const search = document.getElementById("q");
    const sort = document.getElementById("sort");
    search.value = state.q;
    sort.value = state.sort;

    let timer = 0;
    search.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        state.q = search.value;
        state.page = 1;
        render();
      }, 160);
    });
    document.getElementById("filters").addEventListener("submit", (event) => event.preventDefault());
    sort.addEventListener("change", () => {
      state.sort = sort.value === "oldest" ? "oldest" : "newest";
      state.page = 1;
      render();
    });
    chips.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      state.category = button.dataset.category;
      state.page = 1;
      render();
    });
    document.getElementById("clear").addEventListener("click", resetFilters);
    document.getElementById("card-grid").addEventListener("click", (event) => {
      if (event.target.id === "empty-clear") resetFilters();
    });
    document.getElementById("pager").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || button.disabled) return;
      state.page = Number(button.dataset.page);
      render({ scroll: true });
    });

    try {
      const response = await fetch("/api/posts", { cache: "no-store" });
      if (response.ok) {
        const posts = await response.json();
        if (Array.isArray(posts)) {
          const known = new Set(window.BROADCASTIO.articles.map((item) => item.id));
          posts.forEach((post) => {
            if (!post?.slug || known.has(post.slug)) return;
            window.BROADCASTIO.articles.unshift({
              id: post.slug,
              title: post.title,
              dek: post.excerpt || "",
              category: post.category || "Product Reviews",
              date: post.date,
              minutes: post.readTime || 1,
              image: post.image || "",
              imageAlt: post.title,
              role: "Desk",
              tags: Array.isArray(post.keywords) ? post.keywords : [],
              excerpt: post.excerpt || "",
              productIds: [],
              body: []
            });
          });
        }
      }
    } catch (error) {
      console.error("Published posts unavailable", error);
    }

    render();
    if (window.location.hash === "#search") search.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
