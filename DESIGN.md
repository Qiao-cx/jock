# 设计规范

工程蓝图风格：暖纸白底、发丝网格、墨蓝文字、朱砂红点缀。精密、克制、可读，拒绝霓虹渐变与装饰性科技元素。

所有设计变量定义在 `assets/css/style.css` 的 `:root`，页面只引用变量，不写硬编码值。

## 色板

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--color-bg` | `#f7f6f2` | 页面底色（暖纸白，非纯白） |
| `--color-surface` | `#ffffff` | 卡片、弹窗表面 |
| `--color-ink` | `#26282c` | 正文，对比度约 12.5:1 |
| `--color-ink-soft` | `#454a50` | 二级文字，约 8.4:1 |
| `--color-muted` | `#676c73` | 辅助文字，约 5:1 |
| `--color-accent` | `#b03a24` | 朱砂红，主操作色，约 5.4:1 |
| `--color-accent-deep` | `#8a2c1a` | 主按钮悬停 |
| `--color-accent-soft` | `#f2deda` | 选中态、强调底色 |
| `--color-hairline` | `rgba(38,40,44,.12)` | 分隔线与描边 |
| `--color-gridline` | `rgba(38,40,44,.06)` | 背景网格 |

正文与可交互元素对比度均不低于 4.5:1。

## 字体

- 拉丁：Archivo 变量字体，自托管 `assets/fonts/archivo-latin-wght-normal.woff2`，覆盖 100–900 字重。
- 中文：系统字体栈（PingFang SC / Hiragino Sans GB / Microsoft YaHei / Noto Sans CJK SC）。
- 中文标题字重上限 700，避免 Microsoft YaHei 假粗体。
- 字阶 `--step-0` 至 `--step-5` 使用 `clamp()`，正文下限 1rem。

## 间距与布局

- 间距基于 4 单位刻度：`--space-1`（0.25rem）至 `--space-10`（8rem）。
- 内容宽度 `--content-width`：`min(100% - 2 × 2rem, 1100px)`。
- 正文行宽上限 `--measure`：65ch。
- 圆角：`--radius-sm` 4px、`--radius-md` 8px，不使用胶囊。

## 动效

- 时长：`--dur-micro` 160ms、`--dur-base` 240ms、`--dur-entrance` 900ms。
- 缓动：`--ease-expo`、`--ease-default`。
- 每个页面只保留一个入场序列，通过 `animation-delay` 错开层级。
- `prefers-reduced-motion: reduce` 时全局关闭动画与过渡。

## 组件约定

- 按钮：最小高度 48px，朱砂实底，悬停反转为深朱砂。
- 焦点：全局 `:focus-visible` 使用朱砂色 2px 焦点环，偏移 3px。
- 背景：`body::before` 固定层绘制发丝网格并向中心淡出，纯 CSS 实现，不依赖 JavaScript。
- 图标：内联 SVG 线稿，不使用图标库与 emoji。
