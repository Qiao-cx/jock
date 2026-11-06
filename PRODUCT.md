# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
纯静态 HTML/CSS/JS（用户确认：无框架、无构建步骤）。Cloudflare Pages 托管，静态文件直出。

## Users
访客 = 潜在雇主、合作者、技术社区成员；也可能是好奇的网友。场景：电脑或手机上打开主页，几秒内想了解「JOCK 乔昶旭是谁」。

## Product Purpose
个人介绍网站。目标：让访客在首屏（名字 + 座右铭 + 三个按钮）快速进入三个动作之一——看「关于我」的个人介绍、直接邮件联系、以及占位的第三个入口。成功 = 访客 5 秒内知道这是谁、能做什么、怎么联系。

## Positioning
中文名 + 拉丁名双名呈现，工程蓝图式极简视觉（纸白 + 发丝网格 + 墨蓝 + 朱砂红）。座右铭「天行健，君子以自强不息」。区分于常见暗色霓虹技术页的「经典 AI 生成科技风」。

## Operating Context
- 首页 index.html：乔昶旭（上）→ JOCK（下）→ 座右铭 → 三个按钮（关于我 / 待定 / 联系我）。
- 关于我 about.html：自我介绍、技能、照片占位、爱好、我的作品、我的博客。
- 联系我 → mailto 直弹邮件客户端，收件人 dau4wuqlan9066@gmail.com。
- 待定按钮 → 点击提示「即将上线」（中间按钮命名待定，内容待构建）。

## Capabilities and Constraints
- 无构建步骤，纯静态。自托管 Archivo 变量字体（latin 子集），CJK 用系统字体栈（不携带多 MB 中文字体）。
- 动效尊重 prefers-reduced-motion；内容在无 JS 时完整可见（入场动画仅 CSS 渐进增强）。
- 响应式：360px 起不横向溢出，触控目标 ≥44px。
- 无障碍：zh-Hans、地标、标题层级、skip-link、焦点环、对比度 ≥4.5:1。

## Brand Commitments
- 中文名：乔昶旭；英文名：JOCK。
- 座右铭「天行健，君子以自强不息」。
- 邮箱 dau4wuqlan9066@gmail.com。
- 视觉方向「工程蓝图」（已由用户选定，见 DESIGN.md）。

## Evidence on Hand
无真实内容（项目经历、联系方式明细、博客链接、照片）尚未提供——实施阶段使用带【占位】标记的文本，最后统一替换。不得虚构。

## Product Principles
1. 首屏极简：一个核心动作区，别无噪音。
2. 三按钮各司其职：一个跳转、一个占位、一个直连邮件。
3. 工程蓝图视觉：精密、克制、可读；拒绝俗套科技装饰。
4. 先占位后替换：结构与设计先行，真实内容最后集中填。

## Accessibility & Inclusion
zh-Hans 单语页面；键盘全可达；对比度达标；reduced-motion 降级。
