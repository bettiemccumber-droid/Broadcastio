/**
 * 文章详情：正文、产品推荐、相关文章与阅读进度。
 */
(function () {
  /**
   * 把正文里的 [[style:url|label]] 标记转成带样式的超链接。
   * @param {string} text
   * @returns {string}
   */
  function formatRichText(text) {
    const escaped = window.Site.escapeHtml(text);
    return escaped.replace(/\[\[(signal|mark|quiet|pill):([^|\]]+)\|([^\]]+)\]\]/g, (_match, style, href, label) => {
      const safeHref = window.Site.escapeHtml(href);
      const safeLabel = window.Site.escapeHtml(label);
      const external = /^https?:\/\//i.test(href);
      const rel = external ? ` rel="noopener sponsored"` : "";
      const target = external ? ` target="_blank"` : "";
      return `<a class="ink-link ink-link--${style}" href="${safeHref}"${target}${rel}>${safeLabel}</a>`;
    });
  }

  /**
   * 产品推荐嵌入块（轻量，不抢正文）。
   * @param {Object} product
   * @returns {string}
   */
  function productEmbed(product) {
    const href = product.buyUrl || `product.html?id=${encodeURIComponent(product.id)}`;
    const external = Boolean(product.buyUrl);
    const attrs = external ? ` target="_blank" rel="noopener sponsored"` : "";
    return `
      <a class="product-embed product-embed--soft" href="${window.Site.escapeHtml(href)}"${attrs}>
        <img src="${window.Site.escapeHtml(product.image)}" alt="${window.Site.escapeHtml(product.imageAlt)}" width="480" height="320">
        <span>
          <span class="kicker">${window.Site.escapeHtml(product.verdict)}</span>
          <strong>${window.Site.escapeHtml(product.name)}</strong>
          <em>${window.Site.escapeHtml(product.summary)}</em>
          <span class="meta"><span>${window.Site.escapeHtml(product.price)}</span><span>${product.rating.toFixed(1)} / 5</span>${external ? "<span>Open Qronge</span>" : ""}</span>
        </span>
      </a>`;
  }

  /**
   * 把结构化正文渲染成 HTML。
   * @param {Object} article
   * @returns {string}
   */
  function renderBody(article) {
    let lead = true;
    return article.body.map((block) => {
      if (block.type === "p") {
        const cls = lead ? ' class="drop"' : "";
        lead = false;
        return `<p${cls}>${formatRichText(block.text)}</p>`;
      }
      if (block.type === "h2") return `<h2>${window.Site.escapeHtml(block.text)}</h2>`;
      if (block.type === "ul") {
        const items = block.items.map((item) => `<li>${formatRichText(item)}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      if (block.type === "quote") {
        return `<blockquote class="pullquote"><p>${formatRichText(block.text)}</p><cite>${window.Site.escapeHtml(block.cite || "Broadcastio Desk")}</cite></blockquote>`;
      }
      if (block.type === "image") {
        const tone = block.tone ? ` figure-note--${window.Site.escapeHtml(block.tone)}` : "";
        return `<figure class="figure-note${tone}"><img src="${window.Site.escapeHtml(block.src)}" alt="${window.Site.escapeHtml(block.alt)}" width="1200" height="675" loading="lazy"><figcaption>${formatRichText(block.caption || "")}</figcaption></figure>`;
      }
      if (block.type === "note") {
        return `<aside class="soft-note"><p class="kicker">${window.Site.escapeHtml(block.kicker || "Desk note")}</p><p>${formatRichText(block.text)}</p></aside>`;
      }
      if (block.type === "product") {
        const product = window.Site.findById(window.BROADCASTIO.products, block.id);
        return product ? productEmbed(product) : "";
      }
      return "";
    }).join("");
  }

  /**
   * 同栏目优先的相关文章。
   * @param {Object} article
   * @returns {Array<Object>}
   */
  function relatedArticles(article) {
    const rest = window.BROADCASTIO.articles.filter((item) => item.id !== article.id);
    const same = window.Site.sortByDate(rest.filter((item) => item.category === article.category), "newest");
    const others = window.Site.sortByDate(rest.filter((item) => item.category !== article.category), "newest");
    return same.concat(others).slice(0, 3);
  }

  /**
   * 复制当前链接并给出反馈。
   * @param {HTMLButtonElement} button
   * @returns {Promise<void>}
   */
  async function copyLink(button) {
    const value = window.location.href;
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    button.textContent = "Link copied";
    window.setTimeout(() => {
      button.textContent = "Copy link";
    }, 1600);
  }

  /**
   * 更新文顶阅读进度。
   * @returns {void}
   */
  function bindProgress() {
    const bar = document.getElementById("progress");
    if (!bar) return;
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? (root.scrollTop / max) * 100 : 0;
      bar.style.width = `${ratio}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /**
   * 渲染一篇文章，或显示未找到。
   * @returns {void}
   */
  async function loadPublished(slug) {
    const response = await fetch(`/api/posts/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const body = await response.json();
    const listResponse = await fetch("/api/posts", { cache: "no-store" });
    const posts = listResponse.ok ? await listResponse.json() : [];
    const meta = Array.isArray(posts) ? posts.find((item) => item.slug === slug) : null;
    if (!meta || typeof body.bodyHtml !== "string") return null;
    return { ...meta, bodyHtml: body.bodyHtml };
  }

  async function init() {
    bindProgress();
    const root = document.getElementById("article-root");
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "";
    const id = params.get("id") || "";
    const article = window.Site.findById(window.BROADCASTIO.articles, id);
    if (!article && (slug || id)) {
      const post = await loadPublished(slug || id).catch(() => null);
      if (post) {
        document.title = `${post.title} — Broadcastio`;
        const when = post.date ? window.Site.formatDate(post.date) : "";
        root.innerHTML = `
          <article>
            <div class="article-sheet">
              <header class="article-head">
                <div>
                  <p class="crumbs"><a href="blog.html">Journal</a><span aria-hidden="true">/</span><span>${window.Site.escapeHtml(post.category || "Journal")}</span><span aria-hidden="true">/</span><span>${window.Site.escapeHtml(post.title)}</span></p>
                  <p class="kicker">${window.Site.escapeHtml(post.category || "Product Reviews")}</p>
                  <h1>${window.Site.escapeHtml(post.title)}</h1>
                  <p class="lede">${window.Site.escapeHtml(post.excerpt || "")}</p>
                </div>
                <div class="meta-row">
                  <p class="meta"><span>By ${window.Site.escapeHtml(post.author || "Broadcastio Desk")}</span>${when ? `<time datetime="${window.Site.escapeHtml(post.date)}">${when}</time>` : ""}<span>${post.readTime || 1} min read</span></p>
                  <button class="text-btn" type="button" id="copy-link">Copy link</button>
                </div>
              </header>
              ${post.image ? `<img class="article-hero-img" src="${window.Site.escapeHtml(post.image)}" alt="">` : ""}
              <div class="article-main prose">${post.bodyHtml}</div>
            </div>
          </article>`;
        document.getElementById("copy-link").addEventListener("click", (event) => {
          copyLink(event.currentTarget);
        });
        window.Site.watch(root);
        return;
      }
    }
    if (!article) {
      document.title = "Piece not found — Broadcastio";
      root.innerHTML = `<div class="wrap not-found"><h1>This piece is not on the desk.</h1><p><a href="blog.html">Back to the journal</a></p></div>`;
      return;
    }

    document.title = `${article.title} — Broadcastio`;
    const inlineIds = new Set(article.body.filter((block) => block.type === "product").map((block) => block.id));
    const extra = article.productIds
      .filter((productId) => !inlineIds.has(productId))
      .map((productId) => window.Site.findById(window.BROADCASTIO.products, productId))
      .filter(Boolean);
    const tags = article.tags.map((tag) => {
      const href = `blog.html?q=${encodeURIComponent(tag)}`;
      return `<li><a href="${href}">${window.Site.escapeHtml(tag)}</a></li>`;
    }).join("");
    const rail = extra.length
      ? `<aside class="article-rail"><p class="kicker">Also on the bench</p>${extra.map((product) => {
        const href = `product.html?id=${encodeURIComponent(product.id)}`;
        return `<a class="rail-card" href="${href}"><img src="${window.Site.escapeHtml(product.image)}" alt="${window.Site.escapeHtml(product.imageAlt)}"><span><strong>${window.Site.escapeHtml(product.name)}</strong><em>${window.Site.escapeHtml(product.price)} · ${window.Site.escapeHtml(product.verdict)}</em></span></a>`;
      }).join("")}</aside>`
      : "";
    const categoryHref = `blog.html?category=${encodeURIComponent(article.category)}`;
    const related = relatedArticles(article).map((item) => window.Site.articleCard(item)).join("");

    root.innerHTML = `
      <article>
        <div class="article-sheet${extra.length ? " has-rail" : ""}">
          <header class="article-head">
            <div>
              <p class="crumbs"><a href="blog.html">Journal</a><span aria-hidden="true">/</span><a href="${categoryHref}">${window.Site.escapeHtml(article.category)}</a><span aria-hidden="true">/</span><span>${window.Site.escapeHtml(article.title)}</span></p>
              <p class="kicker">${window.Site.escapeHtml(article.category)}</p>
              <h1>${window.Site.escapeHtml(article.title)}</h1>
              <p class="lede">${window.Site.escapeHtml(article.dek)}</p>
            </div>
            <div class="meta-row">
              <p class="meta"><span>By the ${window.Site.escapeHtml(article.role)}</span><time datetime="${article.date}">${window.Site.formatDate(article.date)}</time><span>${article.minutes} min read</span></p>
              <button class="text-btn" type="button" id="copy-link">Copy link</button>
            </div>
          </header>
          <img class="article-hero-img" src="${window.Site.escapeHtml(article.image)}" alt="${window.Site.escapeHtml(article.imageAlt)}" width="1600" height="900">
          <div class="article-main prose">
            ${renderBody(article)}
            <ul class="tags">${tags}</ul>
            <p class="correction">Spotted an error? <a href="contact.html">Send a correction</a>.</p>
          </div>
          ${rail}
        </div>
        <section class="section related wrap">
          <div class="section-head"><p class="kicker">Keep reading</p><h2>More from the desk</h2></div>
          <div class="card-grid">${related}</div>
        </section>
      </article>`;

    document.getElementById("copy-link").addEventListener("click", (event) => {
      copyLink(event.currentTarget);
    });
    window.Site.watch(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
