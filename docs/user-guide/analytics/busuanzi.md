# 不蒜子统计（Busuanzi）
> 最后更新：2026-10-05
> 标签：NotionNext、站点统计、不蒜子、Vercount

NotionNext 默认开启的「不蒜子（Busuanzi）」PV/UV 计数，是基于第三方脚本实现的轻量站点统计。它会向 `busuanzi_value_site_pv` / `busuanzi_value_site_uv` / `busuanzi_value_page_pv` 这三类 span 写入访客数与阅读量，渲染逻辑由 `components/AnalyticsBusuanzi.js`、各主题的 `Footer` / `AnalyticsCard` / `ArticleInfo` 完成。

::: warning 2024 年起的上游变更
不蒜子官方服务（`busuanzi.ibruce.info`）自 2024 年起频繁 502/不可达，导致所有 fork 站点的 PV/UV 数字持续为空白。从 v4.x 起，NotionNext 已将默认端点切换到社区维护的兼容实现 **Vercount** (`https://events.vercount.one/js`)，与原有 span 标签完全兼容，无需任何 UI 改动。
:::

## 自动迁移说明（升级站点后会发生什么）

如果你之前一直在用不蒜子、并保留着 `NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE=true`，升级后：

- **历史数据不会丢**：Vercount 在站点首次访问时会自动从 `busuanzi.ibruce.info` 同步 `site_pv` / `site_uv` / `page_pv` 到 Vercount 自己的存储，对站长完全零操作。
- **不需要改模板/主题**：所有 Footer / AnalyticsCard / ArticleInfo 仍按 `busuanzi_value_*` span 取数，渲染逻辑未动。
- **不需要新增任何脚本标签**：NotionNext 已内置注入。

## 国内访问速度与 GFW 风险实测（2026-10）

| 端点 | 实测 HTTP | 实测延迟 | 后端 |
| --- | --- | --- | --- |
| `https://events.vercount.one/js`（Vercount 官方） | 200 | ~0.7s | Cloudflare AS13335 |
| `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback`（原不蒜子） | 502 | — | IT7 Networks 单点 VPS（已挂） |

- **Vercount 与 busuanzi 都没有 ICP 备案**，理论上面临同等 GFW 风险。
- 但实际上 Vercount 比 busuanzi 更稳定：
  - Vercount 的 `events.vercount.one` 后端是 **Cloudflare Anycast**，三大运营商均与 Cloudflare 有 peering，路由劣化通常只是一过性。
  - 不蒜子的服务器是 **IT7 Networks（16clouds）的廉价美国 VPS**，单点、无 CDN，2024 年起频繁 502，本身就处于半瘫痪状态。
- **如果哪天 Vercount 在国内真出问题**，官方没有提供 CDN 镜像（截至本 PR 编写时，jsdelivr / elemecdn / 字节 fastly 等路径都返回 404，不可用）。唯一稳定退路是「自托管 Vercount」（见下文）。

## 环境变量

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE` | `true` | 总开关；关闭后整个 Busuanzi 注入逻辑不再执行 |
| `NEXT_PUBLIC_BUSUANZI_SCRIPT_URL` | `https://events.vercount.one/js` | 实际拉取的脚本地址；按 URL 形态自动分流：JSONP 走原不蒜子流程，其他按 `<script>` 注入 |

### `NEXT_PUBLIC_BUSUANZI_SCRIPT_URL` 常用配置

```bash
# 默认（Vercount 官方，Cloudflare CDN，国内访问实测可用）
NEXT_PUBLIC_BUSUANZI_SCRIPT_URL=https://events.vercount.one/js

# 自托管 Vercount（推荐长期方案，掌握自己的数据）
NEXT_PUBLIC_BUSUANZI_SCRIPT_URL=https://vercount.your-domain.com/js

# 仍想用原不蒜子 JSONP（自托管或上游恢复时）
NEXT_PUBLIC_BUSUANZI_SCRIPT_URL=//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback
```

## 自托管 Vercount（推荐长期方案）

如果你的站点 PV/UV 量大，或希望完全掌控访客数据 / 规避境外依赖，建议自托管 Vercount：

1. 参考 [Vercount 仓库](https://github.com/EvanNotFound/vercount) 一键部署到 Vercel（也可以部署到 Cloudflare Workers、Docker 等）。
2. 绑定一个 Redis 实例（Upstash 免费档即可）。
3. 部署完成后，把 `https://<your-vercount-host>/js` 写到 `NEXT_PUBLIC_BUSUANZI_SCRIPT_URL`。
4. 历史数据迁移：首次访问时 Vercount 会自动从 `busuanzi.ibruce.info` 同步 PV/UV，无需手动导入。
5. 想要更稳的国内访问，可以把 Vercount 部署到 Cloudflare Workers，再绑一个 Cloudflare CNAME/IPv6 friendly 的小域名；或用 Cloudflare Pages + KV（参见 Vercount 仓库 issues）。

## 自托管原版不蒜子

如果你的网络环境访问 Vercount 不稳定，又希望走回原始不蒜子的 JSONP 协议：

1. 部署一个不蒜子的兼容服务（社区有 Go、Node、PHP 多种实现），暴露 `?jsonpCallback=BusuanziCallback` 接口。
2. 把服务地址写到 `NEXT_PUBLIC_BUSUANZI_SCRIPT_URL`，例如：

   ```bash
   NEXT_PUBLIC_BUSUANZI_SCRIPT_URL=https://busuanzi.your-domain.com/busuanzi?jsonpCallback=BusuanziCallback
   ```

3. 插件会自动按 URL 是否包含 `jsonpCallback=` 切到 JSONP 流程，原有回填逻辑完整保留。

## 排查清单

| 现象 | 可能原因 | 处理方法 |
| --- | --- | --- |
| 部署后 PV/UV 一直是空的 | 浏览器拦截了第三方脚本 / 广告拦截器把 `events.vercount.one` 屏蔽了 | 关掉广告插件再访问一次；若仍未恢复，自托管 Vercount |
| 数字明显比旧站少 | 升级后第一次访问，Vercount 还在从 `busuanzi.ibruce.info` 同步历史 | 等几小时再观察；可在浏览器开发者工具 Network 里看 `events.vercount.one/api/v2/log` 请求返回 |
| 国内访问脚本极慢 / 加载不出来 | Vercount 官方域名在国内临时劣化（少见） | 切到自托管 Vercount，或改用 Clarity / 51la 等国内有 ICP 的统计方案 |
| 容器始终是 `hidden` | `ANALYTICS_BUSUANZI_ENABLE` 被关闭 | 把 `NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE` 设为 `true`（默认） |
| 自己改了模板，不显示数字 | 自定义了 `Footer`，漏掉 `busuanzi_value_*` span | 参考 `themes/simple/components/Footer.js` 把 span 加回来 |

## 与其他统计方案的关系

`components/ExternalPlugins.js` 中 Busuanzi 与 GA / 百度统计 / Clarity / 51.la / Umami / Ackee / Matomo 等是并列关系，互不冲突。轻量阅读量用 Busuanzi，深度访问分析用 GA / Clarity / Umami；如果担心 Vercount 在国内的可用性，**51la / 百度统计 / 微软 Clarity** 这三个是国内有 ICP 备案的服务，作为兜底。

## 参考链接

- Vercount（社区维护的 busuanzi 兼容实现）：[github.com/EvanNotFound/vercount](https://github.com/EvanNotFound/vercount)
- Vercount 托管：[vercount.one](https://vercount.one)
- 不蒜子官方：[busuanzi.ibruce.info](http://busuanzi.ibruce.info/)（长期不稳定，仅作参考）
