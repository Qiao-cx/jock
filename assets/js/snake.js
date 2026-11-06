/* 贪吃蛇 · JOCK / 乔昶旭
   纯原生 canvas 实现，无依赖。
   方向键 / WASD 或下方触屏按钮控制。 */

(function () {
  "use strict";

  var canvas = document.getElementById("snake-canvas");
  var startBtn = document.getElementById("snake-start");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");

  var COLS = 20;
  var ROWS = 20;
  var CELL = 26;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = COLS * CELL * DPR;
  canvas.height = ROWS * CELL * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  /* 与站点调色板保持一致 */
  var INK = "#26282c";
  var ACCENT = "#b03a24";
  var BG = "#f7f6f2";
  var GRID = "rgba(38, 40, 44, 0.08)";

  var snake = [];
  var dir = { x: 1, y: 0 };
  var nextDir = null;
  var food = null;
  var score = 0;
  var best = 0;
  var running = false;
  var dead = false;
  var timer = null;
  var speed = 140;
  var hasStarted = false;

  var scoreEl = document.getElementById("score");
  var bestEl = document.getElementById("best");

  function randomCell() {
    return {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
  }

  function spawnFood() {
    var c;
    do {
      c = randomCell();
    } while (snake.some(function (s) { return s.x === c.x && s.y === c.y; }));
    food = c;
  }

  function updateScore() {
    scoreEl.textContent = String(score);
    bestEl.textContent = String(best);
  }

  function reset() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    dir = { x: 1, y: 0 };
    nextDir = null;
    score = 0;
    speed = 140;
    dead = false;
    spawnFood();
    updateScore();
    draw();
  }

  function begin() {
    reset();
    running = true;
    hasStarted = true;
    if (timer) clearInterval(timer);
    timer = setInterval(step, speed);
    startBtn.textContent = "再来一局";
  }

  function restartTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(step, speed);
  }

  function step() {
    var nd = nextDir || dir;
    if (!(nd.x === -dir.x && nd.y === -dir.y)) dir = nd;
    nextDir = null;

    var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      gameOver();
      return;
    }

    var eating = food && head.x === food.x && head.y === food.y;
    var i;
    for (i = 0; i < snake.length - (eating ? 0 : 1); i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        gameOver();
        return;
      }
    }

    snake.unshift(head);
    if (eating) {
      score++;
      if (score > best) best = score;
      updateScore();
      spawnFood();
      if (speed > 70) {
        speed = Math.max(70, 140 - Math.floor(score / 3) * 10);
        restartTimer();
      }
    } else {
      snake.pop();
    }
    draw();
  }

  function gameOver() {
    dead = true;
    if (timer) clearInterval(timer);
    draw();
    ctx.fillStyle = "rgba(38, 40, 44, 0.82)";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.fillStyle = BG;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 26px sans-serif";
    ctx.fillText("游戏结束", (COLS * CELL) / 2, (ROWS * CELL) / 2 - 18);
    ctx.font = "18px sans-serif";
    ctx.fillText("得分 " + score + " · 最高 " + best, (COLS * CELL) / 2, (ROWS * CELL) / 2 + 24);
    startBtn.textContent = "再来一局";
  }

  function draw() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = 0; x <= COLS; x++) {
      ctx.moveTo(x * CELL + 0.5, 0);
      ctx.lineTo(x * CELL + 0.5, ROWS * CELL);
    }
    for (var y = 0; y <= ROWS; y++) {
      ctx.moveTo(0, y * CELL + 0.5);
      ctx.lineTo(COLS * CELL, y * CELL + 0.5);
    }
    ctx.stroke();

    if (food) {
      ctx.fillStyle = ACCENT;
      ctx.fillRect(food.x * CELL + 4, food.y * CELL + 4, CELL - 8, CELL - 8);
    }

    for (var i = snake.length - 1; i >= 0; i--) {
      ctx.fillStyle = i === 0 ? INK : "rgba(38, 40, 44, 0.72)";
      ctx.fillRect(snake[i].x * CELL + 1, snake[i].y * CELL + 1, CELL - 2, CELL - 2);
    }
  }

  /* 键盘控制 */
  var KEYS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
    W: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    A: { x: -1, y: 0 },
    D: { x: 1, y: 0 }
  };

  /* 统一的方向指令入口：自动处理开局 / 重开 / 游戏中换向 */
  function applyDir(nd) {
    if (!nd) return;
    if (dead) begin();
    else if (!running) {
      begin();
      nextDir = nd;
    } else {
      nextDir = nd;
    }
  }

  /* 键盘：方向键 / WASD */
  document.addEventListener("keydown", function (e) {
    var nd = KEYS[e.key];
    if (!nd) return;
    e.preventDefault();
    applyDir(nd);
  });

  /* 触屏方向键 */
  var DIR_MAP = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  document.querySelectorAll(".pad-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyDir(DIR_MAP[btn.dataset.dir]);
    });
  });

  /* 触屏滑动手势：在棋盘上滑动改变方向 */
  var boardEl = document.querySelector(".snake__board");
  var touchStart = null;
  if (boardEl) {
    boardEl.addEventListener(
      "touchstart",
      function (e) {
        touchStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      },
      { passive: true }
    );
    /* touch-action: none 已在 CSS 中设置，这里阻止默认滚动兜底 */
    boardEl.addEventListener(
      "touchmove",
      function (e) {
        if (e.cancelable) e.preventDefault();
      },
      { passive: false }
    );
    boardEl.addEventListener("touchend", function (e) {
      if (!touchStart) return;
      var dx = e.changedTouches[0].clientX - touchStart.x;
      var dy = e.changedTouches[0].clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return; /* 视为点按，忽略 */
      var nd;
      if (Math.abs(dx) > Math.abs(dy)) {
        nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else {
        nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }
      applyDir(nd);
    });
  }

  /* 开始 / 重开按钮 */
  startBtn.addEventListener("click", function () {
    if (running && !dead) return; /* 游戏中忽略 */
    begin();
  });

  /* 页面打开即自动开局 */
  begin();
})();