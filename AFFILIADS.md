# AffiliAds 内容站接入

Broadcastio 已按与 AJiusBlog 相同的发文约定开放接口。员工在 AffiliAds「内容站」里填本站后，即可把文章推到 Journal。

## 1. 部署到 Vercel（必须）

本仓库是静态页 + `/api/posts` Serverless。要在 AffiliAds 里发文，需要先把仓库接到 Vercel：

1. Vercel → Add New Project → 导入 `bettiemccumber-droid/Broadcastio`
2. Storage → 新建 **Blob**（Private），并连到该项目（会写入 `BLOB_READ_WRITE_TOKEN`）
3. Settings → Environment Variables 增加：

| Name | 说明 |
| --- | --- |
| `PUBLISH_TOKEN` | 自拟长随机串；AffiliAds 里填同一串 |
| `SITE_ORIGIN` | 站点根地址，如 `https://broadcastio.vercel.app`（不要末尾 `/`） |
| `BLOB_READ_WRITE_TOKEN` | 连接 Blob 后一般会自动出现 |

4. Redeploy，确认线上打开首页正常。

## 2. AffiliAds「内容站」怎么填

| 字段 | 填什么 |
| --- | --- |
| 名称 | `Broadcastio` |
| 站点 / 发布地址 | `https://你的域名/api/posts` |
| 发布令牌 / Token | 与 Vercel 环境变量 `PUBLISH_TOKEN` 相同 |
| 文章页规则（若有） | `https://你的域名/article.html?slug={slug}` |

测试连接时，本站对 `{"dryRun":true}` 会返回 `{ ok: true, dryRun: true }`，不会落库。

## 3. 发文约定（给对接方）

```http
POST /api/posts
Authorization: Bearer <PUBLISH_TOKEN>
Content-Type: application/json
```

必填：

- `title`
- `bodyHtml`（也接受 `html` / `content` / `body`）

常用可选：`excerpt`、`category`、`image` / `cover`、`author`、`merchantName`、`merchantUrl`、`mid`、`trackUrl`

成功响应：

```json
{ "slug": "article-slug", "url": "https://你的域名/article.html?slug=article-slug" }
```

公开读：

- `GET /api/posts` → 列表（无正文）
- `GET /api/posts/:slug` → `{ "bodyHtml": "..." }`

删除（需令牌）：

- `DELETE /api/posts/:slug`

## 4. 前端表现

- Journal / 首页会合并 `/api/posts` 列表与静态 `js/data.js` 文章
- 接口文章详情：`article.html?slug=...`
- 静态原稿详情仍用：`article.html?id=...`
