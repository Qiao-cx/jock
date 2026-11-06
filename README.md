# 乔昶旭 · JOCK

个人介绍网站。纯静态多页站点，零框架、零构建步骤，直接部署为静态文件。

## 页面

| 文件 | 内容 |
| --- | --- |
| `index.html` | 主页：左上角姓名与座右铭，居中「关于我 / 联系我」，右下角实时时钟 |
| `about.html` | 关于我：个人简介，简历 / 文章 / 爱好 / 敬请期待 四宫格入口 |
| `resume.html` | 简历：教育经历、实习经历、专业技能、校园经历、荣誉奖项、自我评价 |
| `articles.html` | 文章：微信公众号 ID 展示与一键复制 |
| `hobbies.html` | 爱好：篮球、台球、羽毛球、乒乓球、游泳、爬山、健身、读书 |
| `snake.html` | 贪吃蛇小游戏（由「敬请期待」进入） |

## 技术实现

- **HTML / CSS / JavaScript**，无依赖、无打包。
- **设计系统**：所有设计变量集中在 `assets/css/style.css` 的 `:root`（色板、字阶、间距、动效、焦点环），视觉规范见 `DESIGN.md`。
- **字体**：Archivo 变量字体（拉丁子集）自托管于 `assets/fonts/`；中文回退系统字体栈（PingFang SC / Microsoft YaHei），不加载中文字体文件。
- **渐进增强**：无 JavaScript 时页面内容与非交互功能完整可用；`prefers-reduced-motion` 下关闭全部动效。
- **无障碍**：语义化地标、标题层级、跳过链接、可见焦点环、对比度 ≥ 4.5:1。
- **打印**：`resume.html` 支持 `Ctrl+P` 直接导出 A4 PDF。

## 目录结构

```
├── index.html
├── about.html
├── resume.html
├── articles.html
├── hobbies.html
├── snake.html
└── assets/
    ├── css/style.css          # 设计变量与全部样式
    ├── js/main.js             # 主页时钟、弹窗、复制、粒子背景
    ├── js/snake.js            # 贪吃蛇游戏逻辑
    ├── fonts/                 # Archivo woff2
    └── favicon.svg
```

## 本地预览

```bash
npx --yes http-server . -p 8000 -c-1
```

访问 <http://localhost:8000>。

## 部署

目标平台为 Cloudflare Pages，从 Git 仓库自动构建：

1. 仓库默认分支设为 `main`。
2. Cloudflare 控制台 → Workers & Pages → Create → Pages → Connect to Git，选择仓库。
3. Framework preset 选 **None**，Build command 留空，Build output directory 填 `/`。
4. Production branch 选 `main`，保存并部署。

仓库中的 `.claude/` 与 `.impeccable/` 为设计工具工作目录，随站点发布但不影响运行。

## 联系

邮箱：dau4wuqlan9066@gmail.com
