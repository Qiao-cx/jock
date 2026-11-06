/* JOCK / 乔昶旭 — 脚本
   渐进增强：无 JS 时页面完整可用。
   粒子 canvas + reduced-motion 尊重。 */

(function () {
  "use strict";

  /* ---------- 右下角实时时钟 ---------- */
  var clock = document.getElementById("clock");
  if (clock) {
    function pad(n) {
      return n < 10 ? "0" + n : "" + n;
    }
    function tick() {
      var now = new Date();
      var text =
        now.getFullYear() + "年" +
        (now.getMonth() + 1) + "月" +
        now.getDate() + "日 " +
        pad(now.getHours()) + ":" +
        pad(now.getMinutes()) + ":" +
        pad(now.getSeconds());
      if (clock.textContent !== text) {
        clock.textContent = text;
        clock.setAttribute("datetime", now.toISOString());
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 复制文本 ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.textContent.trim();
      var done = function () {
        var label = btn.textContent;
        btn.textContent = "已复制";
        setTimeout(function () {
          btn.textContent = label;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
        return;
      }
      var range = document.createRange();
      range.selectNodeContents(target);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      done();
    });
  });

  /* ---------- 敬请期待按钮提示 ---------- */
  document.querySelectorAll("[data-coming-soon]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      // 简单的一次性 toast（无依赖）
      var toast = document.createElement("div");
      toast.textContent = "敬请期待";
      toast.setAttribute("role", "status");
      toast.style.cssText =
        "position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);" +
        "background:var(--color-ink);color:var(--color-bg);" +
        "padding:0.75rem 1.5rem;border-radius:4px;font-size:1rem;" +
        "z-index:200;box-shadow:0 4px 16px rgba(0,0,0,0.15);" +
        "transition:opacity 240ms cubic-bezier(0.33,1,0.68,1);";
      document.body.appendChild(toast);
      setTimeout(function () {
        toast.style.opacity = "0";
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 260);
      }, 1600);
    });
  });

  /* ---------- 粒子 canvas（仅在允许动效时启动） ---------- */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.getElementById("particles");
  if (!canvas || !canvas.getContext) return;

  /* 粒子属于首屏装饰：关于子页不启用 */
  if (!document.querySelector(".hero")) return;
  var ctx = canvas.getContext("2d");

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0;
  var H = 0;
  var particles = [];
  var running = false;
  var rafId = null;
  var TARGET_DENSITY = 40000; // px² 每点

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // 重新按密度铺点
    particles = [];
    var count = Math.floor((W * H) / TARGET_DENSITY);
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.4,
        vy: -(Math.random() * 0.25 + 0.05), // 缓慢上飘
        alpha: Math.random() * 0.06 + 0.04
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(38, 40, 44, 1)";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y += p.vy;
      if (p.y < -4) {
        p.y = H + 4;
        p.x = Math.random() * W;
      }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  // 隐藏 tab 或 hero 滚出视口时暂停
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });

  if ("IntersectionObserver" in window) {
    var hero = document.querySelector(".hero");
    if (hero) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }).observe(hero);
    }
  }

  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(resize, 120);
  });

  resize();
  start();
})();
