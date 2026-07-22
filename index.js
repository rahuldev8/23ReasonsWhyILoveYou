const memories = [
  { reason: "Your Eyes", memory: "Your eyes were the first chapter of the love story I never knew I was waiting for ❤️" },
  { reason: "You were my college crush.", memory: "Before you became my love, you were the person my heart kept searching for in every corner of our college." },
  { reason: "You're the most beautiful woman I've ever seen.", memory: "No matter how many faces the world has shown me, yours is the one my heart chose without a second thought." },
  { reason: "You have the most beautiful heart.", memory: "The way you cared for strangers in Chennai showed me that compassion is simply who you are." },
  { reason: "You understand me without a single word.", memory: "Every time you say, 'Nee epdi irupa-nu enakku theriyatha?', I realize my silence speaks fluently only to your heart." },
  { reason: "You are home to me.", memory: "No matter where I am, the moment I'm with you, everything feels like I've finally arrived." },
  { reason: "You are my lucky charm.", memory: "The day my lost earrings turned up right after I called you was just one more reminder that luck seems you to me." },
  { reason: "I never get tired of talking to you.", memory: "No matter how many times we talk, I never run out of things to say or reasons to listen." },
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
