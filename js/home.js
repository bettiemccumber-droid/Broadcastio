/**
 * 落地页：最新文章、分类目录、在测产品和邮件表单。
 */
(function () {
  /**
   * 渲染首页动态区块。
   * @returns {void}
   */
  function renderHome() {
    const data = window.BROADCASTIO;
    const articles = window.Site.sortByDate(data.articles, "newest");
    const latest = articles[0];
    const link = document.getElementById("hero-latest");
    if (link && latest) {
      link.href = `article.html?id=${encodeURIComponent(latest.id)}`;
      link.textContent = latest.title;
    }

    const counts = {};
    data.articles.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    const toc = document.getElementById("toc");
    if (toc) {
      toc.innerHTML = data.categories.map((category, index) => {
        const count = counts[category.name] || 0;
        const label = count === 1 ? "1 piece" : `${count} pieces`;
        const href = `blog.html?category=${encodeURIComponent(category.name)}`;
        return `<li><a href="${href}"><span class="toc-index">${String(index + 1).padStart(2, "0")}</span><span><strong>${window.Site.escapeHtml(category.name)}</strong><em>${window.Site.escapeHtml(category.blurb)}</em></span><span class="toc-count">${label}</span></a></li>`;
      }).join("");
    }

    const feature = document.getElementById("feature");
    if (feature && latest) {
      const href = `article.html?id=${encodeURIComponent(latest.id)}`;
      feature.innerHTML = `
        <a class="feature observe" href="${href}">
          <div class="feature-media">
            <img src="${window.Site.escapeHtml(latest.image)}" alt="${window.Site.escapeHtml(latest.imageAlt)}" width="1200" height="800">
          </div>
          <div>
            <p class="kicker">Latest · ${window.Site.escapeHtml(latest.category)}</p>
            <h3>${window.Site.escapeHtml(latest.title)}</h3>
            <p class="lede">${window.Site.escapeHtml(latest.dek)}</p>
            <p class="meta"><time datetime="${latest.date}">${window.Site.formatDate(latest.date)}</time><span>${latest.minutes} min read</span></p>
          </div>
        </a>`;
    }

    const grid = document.getElementById("latest");
    if (grid) {
      grid.innerHTML = articles.slice(1, 4).map((article) => window.Site.articleCard(article)).join("");
    }

    const gear = document.getElementById("gear-shelf");
    if (gear) {
      gear.innerHTML = data.products.slice(0, 3).map((product) => window.Site.productCard(product)).join("");
    }
    window.Site.watch(document);
  }

  /**
   * 校验落地页邮件表单，并说明预览不会发信。
   * @returns {void}
   */
  function bindNewsletter() {
    const form = document.getElementById("newsletter");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const note = form.querySelector(".form-note");
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      input.setAttribute("aria-invalid", valid ? "false" : "true");
      if (!valid) {
        note.textContent = "Enter a full email address.";
        return;
      }
      note.textContent = "Noted on this page only. This preview does not run a mailing list. Use the contact page if you want a reply.";
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderHome();
      bindNewsletter();
    });
  } else {
    renderHome();
    bindNewsletter();
  }
})();
