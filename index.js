/* =========================
   Memory data
========================= */

const memories = [
  {
    reason: "Your Eyes 💗",
    memory: "Your eyes were the first chapter of the love story I never knew I was waiting for."
  },
  {
    reason: "You were my college crush 💗",
    memory: "Before you became my love, you were the person my heart kept searching for in every corner of our college."
  },
  {
    reason: "You're the most beautiful woman I've ever seen.",
    memory: "No matter how many faces the world has shown me, yours is the one my heart chose without a second thought."
  },
  {
    reason: "You have the most beautiful heart.",
    memory: "The way you cared for strangers in Chennai showed me that compassion is simply who you are."
  },
  {
    reason: "You understand me without a single word.",
    memory: "Every time you say, 'Nee epdi irupa-nu enakku theriyatha?', I realize my silence speaks fluently only to your heart."
  },
  {
    reason: "You are home to me 💗",
    memory: "No matter where I am, the moment I'm with you, everything feels like I've finally arrived."
  },
  {
    reason: "You are my lucky charm.",
    memory: "The day my lost earrings turned up right after I called you was just one more reminder that luck seems you to me."
  },
  {
    reason: "I never get tired of talking to you 💗",
    memory: "No matter how many times we talk, I never run out of things to say or reasons to listen."
  },
  {
    reason: "I love how you preserve even the smallest gifts I give you.",
    memory: "From chocolate box cuttings to cake wrappers, you turned the smallest things I gave you into treasures, making me feel priceless."
  },
  {
    reason: "I love how thoughtful you are with money.",
    memory: "You never chase expensive things—you choose meaningful ones, and that's one of the many reasons I admire you."
  },
  {
    reason: "I love how you respect my thoughts",
    memory: "Every time I tell you I'm not comfortable with something, you choose to understand me instead of changing me."
  },
  {
    reason: "I love your love language.",
    memory: "In every bike ride, every saree you wear, every meal we cook together, and every little gift we exchange, you make ordinary moments feel like forever."
  },
  {
    reason: "I love your loyalty 💗",
    memory: "Even before I asked for your trust, you had already shown me what loyalty truly looks like."
  },
  {
    reason: "I love your patience with me.",
    memory: "No matter how long I take to choose something, you never rush me—you simply wait with the same smile and patience every time."
  },
  {
    reason: "I love the faith you have in me 💗",
    memory: "Even when I doubt myself, you never doubt what I'm capable of, and that belief makes me want to become the person you already see in me."
  },
  {
    reason: "I love how we never stay angry for long.",
    memory: "We may argue, but we never let our egos win over our love."
  },
  {
    reason: "I love the way you look at me.",
    memory: "You notice the little things about me—the way I talk, the way I hold a spoon, the way I eat—and somehow, you make me feel like every ordinary part of me is worth loving."
  },
  {
    reason: "I love how you love wearing my clothes 💗",
    memory: "The way you happily wear my clothes reminds me that love is found in the smallest comforts."
  },
  {
    reason: "I love your Kongu Tamil.",
    memory: "Every word sounds a little sweeter when it's spoken in your Kongu Tamil—it feels like home wrapped in your voice."
  },
  {
    reason: "I love your dance and your voice.",
    memory: "From watching you dance to hearing your voice on the gas booking helpline, every version of you gives me one more reason to smile."
  },
  {
    reason: "I love the way you hold me on our bike rides 💗",
    memory: "The moment your hands find my waist, every road feels a little safer and every ride feels a little more like home."
  },
  {
    reason: "I love how effortlessly you make me feel loved.",
    memory: "In our childish voices and in your quiet \"I'll come to Chennai\", I find a love that never hesitates, never pretends, and always chooses me."
  },
  {
    reason: "I love the way you respect your parents.",
    memory: "The love, patience, and respect you show your parents tell me everything I need to know about the kind of person you are."
  }
];

/* =========================
   Constants
========================= */

// 23 reason cards + 1 final letter card.
const TOTAL_REASON_CARDS = memories.length;
const FINAL_CARD_INDEX = TOTAL_REASON_CARDS;
const TOTAL_CARDS = TOTAL_REASON_CARDS + 1;

// Uses photos/1.webp ... photos/24.webp.
// The 24th image is used for the final letter card.
const photos = Array.from(
  { length: TOTAL_CARDS },
  (_, index) => `photos/${index + 1}.webp`
);

/* =========================
   DOM references
========================= */

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

/* =========================
   State
========================= */

// Tracks unlocked reason cards only.
// The final letter card is not counted in the 23 reasons.
const openedReasons = new Set();

let wallBuilt = false;
let lastFocusedElement = null;

/* =========================
   Helpers
========================= */

function updateProgress() {
  progressChip.textContent = `Opened ${openedReasons.size} / ${TOTAL_REASON_CARDS}`;
}

function createElement(tag, className, textContent = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

/* =========================
   Card creation
========================= */

function makePolaroidCard(index) {
  const isFinal = index === FINAL_CARD_INDEX;
  const memoryItem = memories[index];

  const card = document.createElement("button");
  card.className = `polaroid${isFinal ? " final" : ""}`;
  card.type = "button";
  card.dataset.index = String(index);
  card.dataset.final = String(isFinal);
  card.setAttribute("aria-pressed", "false");
  card.setAttribute(
    "aria-label",
    isFinal ? "Open final birthday letter" : `Open reason ${index + 1}`
  );

  const flip = createElement("div", "flip");

  /* ---------- Front side ---------- */

  const front = createElement("div", "face front");

  const pin = createElement("span", "pin", "❤");
  pin.setAttribute("aria-hidden", "true");

  const photo = createElement("div", "photo");

  const img = document.createElement("img");
  img.src = photos[index];
  img.alt = isFinal ? "Final birthday letter" : memoryItem.reason;
  img.width = 600;
  img.height = 800;
  img.decoding = "async";

  // Load the first few visible images earlier; lazy load the rest.
  if (index < 4) {
    img.loading = "eager";
    img.fetchPriority = "high";
  } else {
    img.loading = "lazy";
    img.fetchPriority = "low";
  }

  photo.appendChild(img);

  const caption = createElement("p", "caption");
  caption.textContent = isFinal ? "Final Letter 💌" : `காரணம் ${index + 1}`;

  if (!isFinal) {
    caption.classList.add("tamil");
  }

  front.append(pin, photo, caption);

  /* ---------- Back side ---------- */

  const back = createElement("div", "face back");

  const reason = createElement(
    "p",
    "reason",
    isFinal ? "A final message waiting for you." : memoryItem.reason
  );

  const memory = createElement(
    "p",
    "memory",
    isFinal ? "Tap again to open the birthday letter." : memoryItem.memory
  );

  back.append(reason, memory);

  flip.append(front, back);
  card.appendChild(flip);

  return card;
}

/* =========================
   Wall rendering
========================= */

function buildWall() {
  if (wallBuilt) return;

  wallBuilt = true;
  openedReasons.clear();
  updateProgress();

  let index = 0;

  // Chunk rendering avoids blocking slower mobile devices.
  function buildChunk() {
    const fragment = document.createDocumentFragment();
    const chunkSize = 4;

    for (let count = 0; count < chunkSize && index < TOTAL_CARDS; count += 1, index += 1) {
      fragment.appendChild(makePolaroidCard(index));
    }

    grid.appendChild(fragment);

    if (index < TOTAL_CARDS) {
      requestAnimationFrame(buildChunk);
    }
  }

  buildChunk();
}

/* =========================
   Card interactions
========================= */

function handleCardClick(event) {
  const card = event.target.closest(".polaroid");

  if (!card || !grid.contains(card)) return;

  const index = Number(card.dataset.index);
  const isFinal = card.dataset.final === "true";
  const isAlreadyOpen = card.classList.contains("open");

  // Final card:
  // first tap flips it, second tap opens the birthday letter.
  if (isFinal) {
    if (!isAlreadyOpen) {
      card.classList.add("open");
      card.setAttribute("aria-pressed", "true");
      return;
    }

    openLetter();
    return;
  }

  card.classList.toggle("open");

  const isOpenNow = card.classList.contains("open");
  card.setAttribute("aria-pressed", String(isOpenNow));

  // Count each reason once, even if the card is closed again.
  openedReasons.add(index);
  updateProgress();
}

/* =========================
   Screen transitions
========================= */

function openWall() {
  buildWall();

  cover.classList.add("cover-exit");

  window.setTimeout(() => {
    cover.classList.add("hidden");
    wall.classList.remove("hidden");
    wall.classList.add("wall-enter");
  }, 220);
}

/* =========================
   Letter dialog
========================= */

function openLetter() {
  lastFocusedElement = document.activeElement;

  letterOverlay.classList.remove("hidden");
  letterOverlay.setAttribute("aria-hidden", "false");

  // Move focus into the dialog for accessibility.
  letterCard.focus();
}

function closeLetter() {
  letterOverlay.classList.add("hidden");
  letterOverlay.setAttribute("aria-hidden", "true");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function handleOverlayClick(event) {
  if (!letterCard.contains(event.target)) {
    closeLetter();
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape" && !letterOverlay.classList.contains("hidden")) {
    closeLetter();
  }
}

/* =========================
   Music
========================= */

async function playMusic() {
  try {
    bgMusic.volume = 0.4;

    // With preload="none", load starts only when the user asks for music.
    bgMusic.load();

    await bgMusic.play();

    musicBtn.textContent = "🎵 Music playing";
    musicBtn.disabled = true;
    musicBtn.style.opacity = "0.85";
  } catch {
    musicBtn.textContent = "Tap again to play 🎵";
  }
}

/* =========================
   Event listeners
========================= */

openWallBtn.addEventListener("click", openWall);
grid.addEventListener("click", handleCardClick);

closeLetterBtn.addEventListener("click", closeLetter);
letterOverlay.addEventListener("click", handleOverlayClick);
document.addEventListener("keydown", handleEscapeKey);

musicBtn.addEventListener("click", playMusic);
