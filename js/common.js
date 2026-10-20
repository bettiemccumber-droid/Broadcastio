/**
 * 共享界面：导航、回到顶部、社交挂件、卡片与日期。
 */
(function () {
  /**
   * 在文档就绪后执行。
   * @param {Function} fn
   * @returns {void}
   */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /**
   * 转义 HTML 特殊字符。
   * @param {string} value
   * @returns {string}
   */
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  /**
   * 将 ISO 日期格式化为英文长日期。
   * @param {string} iso
   * @returns {string}
   */
  function formatDate(iso) {
    const date = new Date(`${iso}T00:00:00`);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  /**
   * 按发布日期排序，默认新到旧。
   * @param {Array<Object>} items
   * @param {"newest"|"oldest"} [direction]
   * @returns {Array<Object>}
   */
  function sortByDate(items, direction) {
    const copy = items.slice();
    copy.sort((a, b) => {
      const diff = new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`);
      return direction === "oldest" ? diff : -diff;
    });
    return copy;
  }

  /**
   * 生成文章卡片。
   * @param {Object} article
   * @returns {string}
   */
  function articleCard(article) {
    const href = `article.html?id=${encodeURIComponent(article.id)}`;
    return `
      <article class="card observe">
        <a class="card-link" href="${href}">
          <div class="card-media">
            <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" width="1200" height="800" loading="lazy">
          </div>
          <div class="card-body">
            <p class="kicker">${escapeHtml(article.category)}</p>
            <h3>${escapeHtml(article.title)}</h3>
            <p class="excerpt">${escapeHtml(article.excerpt)}</p>
            <p class="meta"><time datetime="${escapeHtml(article.date)}">${formatDate(article.date)}</time><span>${article.minutes} min read</span></p>
          </div>
        </a>
      </article>`;
  }

  /**
   * 生成产品卡片。
   * @param {Object} product
   * @returns {string}
   */
  function productCard(product) {
    const href = `product.html?id=${encodeURIComponent(product.id)}`;
    return `
      <article class="card observe">
        <a class="card-link" href="${href}">
          <div class="card-media">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}" width="1200" height="800" loading="lazy">
          </div>
          <div class="card-body">
            <p class="kicker">${escapeHtml(product.category)}</p>
            <h3>${escapeHtml(product.name)}</h3>
            <p class="excerpt">${escapeHtml(product.summary)}</p>
            <p class="meta"><span>${escapeHtml(product.price)}</span><span>${product.rating.toFixed(1)} / 5</span></p>
          </div>
        </a>
      </article>`;
  }

  /**
   * 按主键查找。
   * @param {Array<Object>} list
   * @param {string} id
   * @returns {Object|undefined}
   */
  function findById(list, id) {
    return list.find((item) => item.id === id);
  }

  let observer = null;

  /**
   * 为新插入的区块绑定滚动入场。
   * @param {ParentNode} [root]
   * @returns {void}
   */
  function watch(root) {
    const scope = root || document;
    const nodes = scope.querySelectorAll(".observe:not([data-watched])");
    if (!nodes.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.classList.add("is-in");
        node.setAttribute("data-watched", "true");
      });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    }
    nodes.forEach((node) => {
      node.setAttribute("data-watched", "true");
      observer.observe(node);
    });
  }

  /**
   * 打开或关闭移动端导航。
   * @returns {void}
   */
  function initNav() {
    const button = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!button || !nav) return;

    /**
     * @param {boolean} open
     * @returns {void}
     */
    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    }

    button.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("nav-open"));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  /**
   * 标记当前导航项。
   * @returns {void}
   */
  function setActiveNav() {
    const key = document.body.dataset.nav;
    document.querySelectorAll(".site-nav a").forEach((link) => {
      if (link.dataset.nav === key) link.setAttribute("aria-current", "page");
    });
  }

  /**
   * 滚动超过一屏后显示回到顶部。
   * @returns {void}
   */
  function initToTop() {
    const button = document.querySelector(".to-top");
    if (!button) return;
    const onScroll = () => {
      button.classList.toggle("is-visible", window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * 把页脚社交链接复制成固定挂件。
   * @returns {void}
   */
  function initDock() {
    const source = document.querySelector("[data-social]");
    if (!source || document.querySelector(".social-dock")) return;
    const dock = document.createElement("aside");
    dock.className = "social-dock";
    dock.setAttribute("aria-label", "Social media");
    dock.innerHTML = source.innerHTML;
    document.body.appendChild(dock);
  }

  /**
   * 写入页脚年份。
   * @returns {void}
   */
  function setYear() {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  ready(() => {
    initNav();
    setActiveNav();
    initToTop();
    initDock();
    setYear();
    watch(document);
  });

  window.Site = {
    escapeHtml,
    formatDate,
    sortByDate,
    articleCard,
    productCard,
    findById,
    watch
  };
})();
