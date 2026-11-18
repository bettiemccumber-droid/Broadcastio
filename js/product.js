/**
 * 产品详情：图片、评分、规格和对应测评。
 */
(function () {
  /**
   * 渲染单个产品。
   * @returns {void}
   */
  function init() {
    const root = document.getElementById("product-root");
    const id = new URLSearchParams(window.location.search).get("id");
    const product = window.Site.findById(window.BROADCASTIO.products, id || "");
    if (!product) {
      document.title = "Gear not found — Broadcastio";
      root.innerHTML = `<div class="not-found"><h1>This piece of gear is not on the bench.</h1><p><a href="products.html">Back to the gear</a></p></div>`;
      return;
    }

    document.title = `${product.name} — Broadcastio`;
    const article = window.Site.findById(window.BROADCASTIO.articles, product.articleId);
    const specs = product.specs.map((spec) => {
      return `<div><dt>${window.Site.escapeHtml(spec.label)}</dt><dd>${window.Site.escapeHtml(spec.value)}</dd></div>`;
    }).join("");
    const scores = product.scores.map((score) => {
      return `<div class="score-line"><span>${window.Site.escapeHtml(score.label)}</span><div class="score-track"><span style="width:${score.value * 10}%"></span></div><span>${score.value}/10</span></div>`;
    }).join("");
    const pros = product.pros.map((item) => `<li>${window.Site.escapeHtml(item)}</li>`).join("");
    const cons = product.cons.map((item) => `<li>${window.Site.escapeHtml(item)}</li>`).join("");
    const paragraphs = product.description.map((paragraph) => `<p>${window.Site.escapeHtml(paragraph)}</p>`).join("");
    const articleLink = article
      ? `<a class="btn btn-ink" href="article.html?id=${encodeURIComponent(article.id)}">Read the field note</a>`
      : "";
    const buyLink = product.buyUrl
      ? `<a class="btn btn-ink" href="${window.Site.escapeHtml(product.buyUrl)}" target="_blank" rel="noopener sponsored">Buy at Qronge</a>`
      : "";
    const related = window.BROADCASTIO.products
      .filter((item) => item.id !== product.id)
      .slice(0, 3)
      .map((item) => window.Site.productCard(item))
      .join("");

    root.innerHTML = `
      <p class="crumbs"><a href="products.html">Gear</a><span aria-hidden="true">/</span><a href="products.html?category=${encodeURIComponent(product.category)}">${window.Site.escapeHtml(product.category)}</a><span aria-hidden="true">/</span><span>${window.Site.escapeHtml(product.name)}</span></p>
      <div class="product-layout">
        <img class="product-shot" src="${window.Site.escapeHtml(product.image)}" alt="${window.Site.escapeHtml(product.imageAlt)}" width="1400" height="1050">
        <div>
          <p class="kicker">${window.Site.escapeHtml(product.category)}</p>
          <h1>${window.Site.escapeHtml(product.name)}</h1>
          <p class="verdict">${window.Site.escapeHtml(product.verdict)}</p>
          <p class="price">${window.Site.escapeHtml(product.price)}</p>
          <p class="lede">${window.Site.escapeHtml(product.summary)}</p>
          <p class="meta"><span>${product.rating.toFixed(1)} / 5</span><span>Best for ${window.Site.escapeHtml(product.bestFor)}</span><span>Tested ${window.Site.formatDate(product.tested)}</span></p>
          ${scores}
          <div class="hero-actions">${buyLink}${articleLink}<a class="btn btn-ink" href="products.html" style="background:transparent;color:var(--ink);border-color:var(--line)">All gear</a></div>
        </div>
      </div>
      <div class="prose" style="max-width:46rem;padding-top:12px">
        ${paragraphs}
      </div>
      <h2>What we measured</h2>
      <dl class="spec-list">${specs}</dl>
      <div class="split">
        <div><h2>Keep</h2><ul class="check-list">${pros}</ul></div>
        <div><h2>Leave</h2><ul class="check-list">${cons}</ul></div>
      </div>
      <section class="section">
        <div class="section-head"><p class="kicker">More on the bench</p><h2>Other gear</h2></div>
        <div class="card-grid">${related}</div>
      </section>`;
    window.Site.watch(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
