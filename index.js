const memories = [
  { reason: "Your Eyes 💗", memory: "Your eyes were the first chapter of the love story I never knew I was waiting for." },
  { reason: "You were my college crush 💗", memory: "Before you became my love, you were the person my heart kept searching for in every corner of our college." },
  { reason: "You're the most beautiful woman I've ever seen.", memory: "No matter how many faces the world has shown me, yours is the one my heart chose without a second thought." },
  { reason: "You have the most beautiful heart.", memory: "The way you cared for strangers in Chennai showed me that compassion is simply who you are." },
  { reason: "You understand me without a single word.", memory: "Every time you say, 'Nee epdi irupa-nu enakku theriyatha?', I realize my silence speaks fluently only to your heart." },
  { reason: "You are home to me 💗", memory: "No matter where I am, the moment I'm with you, everything feels like I've finally arrived." },
  { reason: "You are my lucky charm.", memory: "The day my lost earrings turned up right after I called you was just one more reminder that luck seems you to me." },
  { reason: "I never get tired of talking to you 💗", memory: "No matter how many times we talk, I never run out of things to say or reasons to listen." },
  { reason: "I love how you preserve even the smallest gifts I give you.", memory: "From chocolate box cuttings to cake wrappers, you turned the smallest things I gave you into treasures, making me feel priceless."},
  { reason: "I love how thoughtful you are with money.", memory: "You never chase expensive things—you choose meaningful ones, and that's one of the many reasons I admire you." },
  { reason: "I love how you respect my thoughts", memory: "Every time I tell you I'm not comfortable with something, you choose to understand me instead of changing me." },
  { reason: "I love your love language.", memory: "In every bike ride, every saree you wear, every meal we cook together, and every little gift we exchange, you make ordinary moments feel like forever." },
  { reason: "I love your loyalty 💗", memory: "Even before I asked for your trust, you had already shown me what loyalty truly looks like." },
  { reason: "I love your patience with me.", memory: "No matter how long I take to choose something, you never rush me—you simply wait with the same smile and patience every time." },
  { reason: "I love the faith you have in me 💗", memory: "Even when I doubt myself, you never doubt what I'm capable of, and that belief makes me want to become the person you already see in me." },
  { reason: "I love how we never stay angry for long.", memory: "We may argue, but we never let our egos win over our love." },
  { reason: "I love the way you look at me.", memory: "You notice the little things about me—the way I talk, the way I hold a spoon, the way I eat—and somehow, you make me feel like every ordinary part of me is worth loving." },
  { reason: "I love how you love wearing my clothes 💗", memory: "The way you happily wear my clothes reminds me that love is found in the smallest comforts." },
  { reason: "I love your Kongu Tamil.", memory: "Every word sounds a little sweeter when it's spoken in your Kongu Tamil—it feels like home wrapped in your voice." },
  { reason: "I love your dance and your voice.", memory: "From watching you dance to hearing your voice on the gas booking helpline, every version of you gives me one more reason to smile." },
  { reason: "I love the way you hold me on our bike rides 💗", memory: "The moment your hands find my waist, every road feels a little safer and every ride feels a little more like home." },
  { reason: "I love how effortlessly you make me feel loved.", memory: "In our childish voices and in your quiet \"I'll come to Chennai\", I find a love that never hesitates, never pretends, and always chooses me."},
  { reason: "I love the way you respect your parents.", memory: "The love, patience, and respect you show your parents tell me everything I need to know about the kind of person you are." }
];
//
// photos/1.jpg ... photos/23.jpg
const TOTAL_CARDS = 24;
const FINAL_CARD = TOTAL_CARDS - 1;

const photos = Array.from(
  { length: TOTAL_CARDS },
  (_, i) => `photos/${i + 1}.webp`
);

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
  progressChip.textContent = `Opened ${opened.size} / ${TOTAL_CARDS}`;
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

  const img = document.createElement("img");
  img.src = photos[index];
  img.alt = item?.reason || "";
  img.fetchPriority = "high";
  img.loading = "eager";
  img.decoding = "async";

  photo.appendChild(img);

const caption = document.createElement("p");
caption.className = "caption";

if (isFinal) {
  caption.textContent = "Final Letter 💌";
} else {
  caption.innerHTML = `<span class="tamil">காரணம் ${index + 1}</span>`;
}

  front.append(pin, photo, caption);

  const back = document.createElement("div");
  back.className = "face back";

  if (isFinal) {
    back.innerHTML = `
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

function preloadImages() {
  photos.forEach(src => {
    const img = new Image();

    img.src = src;
    img.loading = "eager";
    img.decoding = "async";

    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

function buildWall() {
  
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < TOTAL_CARDS; i++) {
      fragment.appendChild(
          makePolaroidCard(i, i === FINAL_CARD)
      );
  }

  grid.appendChild(fragment);

  opened.clear();

  for (let i = 0; i < TOTAL_CARDS; i++) {
    const isFinal = i === FINAL_CARD;
    grid.appendChild(makePolaroidCard(i, isFinal));
  }

  updateProgress();
}

function enterFullscreen() {
  const el = document.documentElement;

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

openWallBtn.addEventListener("click", () => {
  enterFullscreen();
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
  preloadImages();
  buildWall();
  tryAutoplayMusic();
});
