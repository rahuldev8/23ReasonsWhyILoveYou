const memories = [
  { reason: "You make every ordinary day feel magical.", memory: "Even simple moments with you become unforgettable." },
  { reason: "Your smile is my favorite sunrise.", memory: "It brightens my world instantly." },
  { reason: "You understand me without words.", memory: "One look from you says everything." },
  { reason: "You make me laugh from my heart.", memory: "My happiest laughs are always with you." },
  { reason: "Your kindness is beautiful.", memory: "You care deeply, and I admire that every day." },
  { reason: "You are my comfort place.", memory: "With you, I always feel safe and calm." },
  { reason: "You believe in me.", memory: "You lift me up whenever I doubt myself." },
  { reason: "You are beautiful inside and out.", memory: "Your heart is even prettier than your smile." },
  { reason: "You make little things special.", memory: "Late-night talks and random walks mean everything." },
  { reason: "You are my best friend.", memory: "I can tell you anything and feel understood." },
  { reason: "You inspire me to be better.", memory: "Loving you makes me grow every day." },
  { reason: "Your voice feels like home.", memory: "It calms me in ways nothing else can." },
  { reason: "You are my peace in chaos.", memory: "You make everything feel okay again." },
  { reason: "You celebrate my small wins.", memory: "You cheer for me like no one else." },
  { reason: "You make love feel easy.", memory: "With you, love is natural and true." },
  { reason: "You are my lucky star.", memory: "Meeting you is the best gift life gave me." },
  { reason: "You are my favorite person.", memory: "Every plan is better when it includes you." },
  { reason: "You make me feel chosen.", memory: "Your love feels certain and warm." },
  { reason: "You are my sweetest habit.", memory: "My day feels incomplete without you." },
  { reason: "You make my future feel bright.", memory: "I look ahead and I see us." },
  { reason: "You are my heart’s safest place.", memory: "I can be fully myself with you." },
  { reason: "You are my forever love.", memory: "Every day confirms it even more." },
  { reason: "Because loving you is the easiest thing I’ve ever done.", memory: "And I’ll keep choosing you, always." }
];

// photos/1.jpg ... photos/23.jpg
const photos = Array.from({ length: 23 }, (_, i) => `photos/${i + 1}.jpg`);

const cover = document.getElementById("cover");
const wall = document.getElementById("wall");
const openWallBtn = document.getElementById("openWallBtn");
const grid = document.getElementById("grid");
const progressChip = document.getElementById("progressChip");

const letterOverlay = document.getElementById("letterOverlay");
const letterCard = document.getElementById("letterCard");
const closeLetterBtn = document.getElementById("closeLetterBtn");

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

const opened = new Set();

function updateProgress() {
  progressChip.textContent = `Opened ${opened.size} / 23`;
}

function makePolaroidCard(index, isFinal = false) {
  const card = document.createElement("button");
  card.className = `polaroid ${isFinal ? "final" : ""}`;
  card.type = "button";
  card.setAttribute("aria-label", isFinal ? "Open final letter" : `Open reason ${index + 1}`);

  const item = memories[index];

  const flip = document.createElement("div");
  flip.className = "flip";

  const front = document.createElement("div");
  front.className = "face front";

  const pin = document.createElement("span");
  pin.className = "pin";
  pin.textContent = "❤";

  const photo = document.createElement("div");
  photo.className = "photo";
  photo.style.backgroundImage = `url('${photos[index]}')`;

  const caption = document.createElement("p");
  caption.className = "caption";
  caption.textContent = isFinal ? "Final Letter 💌" : `Reason ${index + 1}`;

  front.append(pin, photo, caption);

  const back = document.createElement("div");
  back.className = "face back";

  if (isFinal) {
    back.innerHTML = `
      <h3>Door 23 💌</h3>
      <p class="reason">A final message waiting for you.</p>
      <p class="memory">Tap again to open the birthday letter.</p>
    `;
  } else {
    back.innerHTML = `
      <h3>Reason ${index + 1}</h3>
      <p class="reason">${item.reason}</p>
      <p class="memory">${item.memory}</p>
    `;
  }

  flip.append(front, back);
  card.appendChild(flip);

  card.addEventListener("click", () => {
    if (isFinal) {
      if (!card.classList.contains("open")) {
        card.classList.add("open");
        opened.add(index);
        updateProgress();
      } else {
        letterOverlay.classList.remove("hidden");
        letterOverlay.setAttribute("aria-hidden", "false");
      }
      return;
    }

    card.classList.toggle("open");

    if (card.classList.contains("open")) {
      opened.add(index);
      updateProgress();
    }
  });

  return card;
}

function buildWall() {
  grid.innerHTML = "";
  opened.clear();

  for (let i = 0; i < 23; i++) {
    const isFinal = i === 22;
    grid.appendChild(makePolaroidCard(i, isFinal));
  }

  updateProgress();
}

openWallBtn.addEventListener("click", () => {
  cover.classList.add("cover-exit");
  setTimeout(() => {
    cover.classList.add("hidden");
    wall.classList.remove("hidden");
    wall.classList.add("wall-enter");
  }, 220);
});

function closeLetter() {
  letterOverlay.classList.add("hidden");
  letterOverlay.setAttribute("aria-hidden", "true");
}

closeLetterBtn.addEventListener("click", closeLetter);
letterOverlay.addEventListener("click", (e) => {
  if (!letterCard.contains(e.target)) closeLetter();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !letterOverlay.classList.contains("hidden")) closeLetter();
});

async function tryAutoplayMusic() {
  bgMusic.volume = 0.4;
  try {
    await bgMusic.play();
    musicBtn.style.display = "none";
  } catch {
    musicBtn.style.display = "block";
  }
}

musicBtn.addEventListener("click", async () => {
  try {
    await bgMusic.play();
    musicBtn.style.display = "none";
  } catch {
    alert("Tap once more to allow music 🎵");
  }
});

window.addEventListener("load", () => {
  buildWall();
  tryAutoplayMusic();
});
