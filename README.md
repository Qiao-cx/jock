# JOCK / 乔昶旭 — 个人网站

个人介绍网站。工程蓝图风格：纸白底 · 发丝网格 · 墨蓝 · 朱砂红点缀。科技感 + 简约感。

## 本地预览

```bash
npx --yes http-server . -p 8000 -c-1
# 打开 http://localhost:8000
```

## 结构

```
index.html   主页（左上角名字 + 座右铭 → 关于我 / 联系我）
about.html   关于我子页
assets/
  css/style.css
  js/main.js
  fonts/archivo-latin-wght-normal.woff2   # 自托管，无外部字体请求
```

- 联系方式：`dau4wuqlan9066@gmail.com`
- 字体：Archivo（拉丁，自托管）+ 系统 CJK 栈（PingFang SC / Microsoft YaHei）

## 设计系统

设计 token 全部定义在 `assets/css/style.css` 的 `:root`（色板、字阶、间距、动效、焦点环）。`DESIGN.md` 记录视觉规范。

## 部署

- GitHub 仓库：`<你的用户名>/<仓库名>`
- Cloudflare Pages → Connect to Git → 框架预设 **None**，构建命令留空，输出目录 `/`，生产分支 `main`。
- 说明：`.claude/` 与 `.impeccable/` 是设计工具（impeccable skill）的工作目录，会被一并部署，无害。
