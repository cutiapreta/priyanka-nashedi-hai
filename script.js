const DEFAULTS = {
  girlfriendName: "Priyanka",
  fromName: "Tumhara"
};

const params = new URLSearchParams(window.location.search);
const girlfriendName = sanitize(params.get("to")) || DEFAULTS.girlfriendName;
const fromName = sanitize(params.get("from")) || DEFAULTS.fromName;

const teaseLines = [
  "No wala button bas sharma raha hai 😌",
  "Arre arre... itni jaldi no nahi 😏",
  "Ye button tumse door rehna chahta hai 💨",
  "Lagta hai answer already Yes hai 😚",
  "No option unavailable due to excessive cuteness 💗",
  "Button bol raha hai: mujhe mat pakdo 🙈"
];

function sanitize(value) {
  if (!value) return "";
  return value.replace(/[<>]/g, "").trim().slice(0, 32);
}

function setPersonalization() {
  document.title = `${girlfriendName} ke liye ❤️`;
  document.querySelectorAll("[data-gf-name]").forEach((node) => {
    node.textContent = girlfriendName;
  });
  const fromNode = document.getElementById("fromName");
  if (fromNode) fromNode.textContent = fromName;
}

function createStars() {
  const stars = document.getElementById("stars");
  if (!stars) return;
  const count = window.innerWidth < 700 ? 35 : 70;
  stars.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--dur", `${2.2 + Math.random() * 4}s`);
    star.style.setProperty("--delay", `${Math.random() * -4}s`);
    stars.appendChild(star);
  }
}

function createFloatingItems() {
  const wrap = document.getElementById("floatWrap");
  const symbols = ["❤", "💗", "🌸", "✨", "💞", "🎀"];
  if (!wrap) return;
  wrap.innerHTML = "";
  const totalItems = window.innerWidth < 700 ? 22 : 40;

  for (let i = 0; i < totalItems; i += 1) {
    const item = document.createElement("span");
    item.className = "float-item";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.setProperty("--left", `${Math.random() * 100}%`);
    item.style.setProperty("--size", `${14 + Math.random() * 22}px`);
    item.style.setProperty("--opacity", `${0.18 + Math.random() * 0.42}`);
    item.style.setProperty("--duration", `${12 + Math.random() * 14}s`);
    item.style.setProperty("--delay", `${Math.random() * -18}s`);
    item.style.setProperty("--drift", `${-50 + Math.random() * 100}px`);
    item.style.setProperty("--blur", `${Math.random() > 0.85 ? 1.2 : 0}px`);
    wrap.appendChild(item);
  }
}

function setupPageNavigation() {
  const buttons = document.querySelectorAll("[data-go]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
    target.querySelectorAll(".reveal").forEach((node, index) => {
      node.classList.remove("visible");
      setTimeout(() => node.classList.add("visible"), 60 + index * 90);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function setupInitialReveal() {
  const visiblePage = document.querySelector(".page.active");
  if (!visiblePage) return;
  visiblePage.querySelectorAll(".reveal").forEach((node, index) => {
    setTimeout(() => node.classList.add("visible"), 80 + index * 120);
  });
}

function setupQuestionStage() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const area = document.getElementById("buttonsArea");
  const teaseText = document.getElementById("teaseText");
  let teaseIndex = 0;

  if (!noBtn || !yesBtn || !area) return;

  const moveNoButton = () => {
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = Math.max(0, area.clientWidth - btnRect.width);
    const maxY = Math.max(90, area.clientHeight - btnRect.height);
    const minY = Math.min(90, maxY);
    const nextX = Math.max(0, Math.min(maxX, Math.random() * maxX));
    const nextY = minY + Math.random() * Math.max(1, maxY - minY);
    noBtn.style.left = `${nextX}px`;
    noBtn.style.top = `${nextY}px`;
    if (teaseText) {
      teaseText.textContent = teaseLines[teaseIndex % teaseLines.length];
      teaseIndex += 1;
    }
  };

  const moveAwayFromCursor = (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const btnRect = noBtn.getBoundingClientRect();
    const distanceX = Math.abs(cursorX - (btnRect.left + btnRect.width / 2));
    const distanceY = Math.abs(cursorY - (btnRect.top + btnRect.height / 2));

    if (distanceX < 110 && distanceY < 70) {
      moveNoButton();
    }
  };

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mousemove", moveNoButton);
  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });
  area.addEventListener("mousemove", moveAwayFromCursor);
  area.addEventListener("touchstart", moveNoButton, { passive: true });

  yesBtn.addEventListener("click", () => {
    if (teaseText) {
      teaseText.textContent = "Mujhe pata thaaa 😚💖";
    }
    burstConfetti(150);
    setTimeout(() => showPage("page3"), 480);
  });
}

function setupMoodRange() {
  const range = document.getElementById("loveRange");
  const moodText = document.getElementById("moodText");
  if (!range || !moodText) return;

  const update = () => {
    const value = Number(range.value);
    if (value <= 20) {
      moodText.textContent = "Aisa thodi hota hai 😌 isse thoda aur badhao.";
    } else if (value <= 50) {
      moodText.textContent = "Theek hai, ye bhi cute hai... par aur better ho sakta hai 🌸";
    } else if (value <= 80) {
      moodText.textContent = "Haan ab baat bani 💗 ab smile bhi banti hai.";
    } else {
      moodText.textContent = "Bas! yahi wala level perfect hai — full pyaar, full cute mode 💞";
    }
  };

  range.addEventListener("input", update);
  update();
}

function setupSecretNotes() {
  const output = document.getElementById("secretOutput");
  document.querySelectorAll(".secret-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (output) output.textContent = button.dataset.secret || "💌";
      burstConfetti(35);
    });
  });
}

function setupChoices() {
  const output = document.getElementById("choiceOutput");
  document.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (output) output.textContent = button.dataset.msg || "💫";
    });
  });
}

function setupFunButtons() {
  const surpriseBtn = document.getElementById("surpriseBtn");
  const heartBurstBtn = document.getElementById("heartBurstBtn");
  const celebrateBtn = document.getElementById("celebrateBtn");
  const finalMagicBtn = document.getElementById("finalMagicBtn");

  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      burstConfetti(80);
      showToast(`${girlfriendName}, tumhari smile ka order place kar diya gaya hai 😚`);
    });
  }

  [heartBurstBtn, celebrateBtn, finalMagicBtn].forEach((button) => {
    if (!button) return;
    button.addEventListener("click", () => {
      burstConfetti(120);
      flashScreen();
    });
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast glass";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2400);
}

function flashScreen() {
  document.body.animate(
    [
      { filter: "brightness(1)" },
      { filter: "brightness(1.12)" },
      { filter: "brightness(1)" }
    ],
    { duration: 800, easing: "ease-out" }
  );
}

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiAnimation = null;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  confettiCanvas.width = Math.floor(window.innerWidth * ratio);
  confettiCanvas.height = Math.floor(window.innerHeight * ratio);
  confettiCanvas.style.width = `${window.innerWidth}px`;
  confettiCanvas.style.height = `${window.innerHeight}px`;
  confettiCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createPiece() {
  const colors = ["#ff4f94", "#ff86b8", "#ffd0b7", "#ffe8a6", "#ffffff", "#c9a8ff"];
  return {
    x: Math.random() * window.innerWidth,
    y: -30 - Math.random() * 120,
    size: 6 + Math.random() * 8,
    speed: 2 + Math.random() * 4.8,
    drift: -2 + Math.random() * 4,
    rotation: Math.random() * Math.PI,
    spin: -0.2 + Math.random() * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.55 ? "heart" : "rect"
  };
}

function burstConfetti(count = 100) {
  for (let i = 0; i < count; i += 1) {
    confettiPieces.push(createPiece());
  }
  if (!confettiAnimation) animateConfetti();
}

function drawHeart(ctx, x, y, size, color, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  const s = size / 16;
  ctx.beginPath();
  ctx.moveTo(0, 6 * s);
  ctx.bezierCurveTo(0, 2 * s, -6 * s, 0, -8 * s, 4 * s);
  ctx.bezierCurveTo(-10 * s, 8 * s, -4 * s, 12 * s, 0, 16 * s);
  ctx.bezierCurveTo(4 * s, 12 * s, 10 * s, 8 * s, 8 * s, 4 * s);
  ctx.bezierCurveTo(6 * s, 0, 0, 2 * s, 0, 6 * s);
  ctx.fill();
  ctx.restore();
}

function animateConfetti() {
  confettiAnimation = requestAnimationFrame(animateConfetti);
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiPieces = confettiPieces.filter((piece) => piece.y < window.innerHeight + 40);

  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.spin;

    if (piece.shape === "heart") {
      drawHeart(confettiCtx, piece.x, piece.y, piece.size, piece.color, piece.rotation);
    } else {
      confettiCtx.save();
      confettiCtx.translate(piece.x, piece.y);
      confettiCtx.rotate(piece.rotation);
      confettiCtx.fillStyle = piece.color;
      confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.7);
      confettiCtx.restore();
    }
  });

  if (!confettiPieces.length) {
    cancelAnimationFrame(confettiAnimation);
    confettiAnimation = null;
  }
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
  createFloatingItems();
});

setPersonalization();
createStars();
createFloatingItems();
setupPageNavigation();
setupInitialReveal();
setupQuestionStage();
setupMoodRange();
setupSecretNotes();
setupChoices();
setupFunButtons();
resizeCanvas();
