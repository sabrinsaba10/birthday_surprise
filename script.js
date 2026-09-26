const CORRECT_PASSWORD = "3103";

// Keypad Functions
function pressKey(num) {
  const input = document.getElementById("passcode-input");
  if (input && input.value.length < 10) {
    input.value += num;
  }
}

function clearPin() {
  const input = document.getElementById("passcode-input");
  const errorMsg = document.getElementById("error-msg");
  if (input) input.value = "";
  if (errorMsg) errorMsg.classList.add("hidden");
}

function deletePin() {
  const input = document.getElementById("passcode-input");
  if (input) {
    input.value = input.value.slice(0, -1);
  }
}

function checkPassword() {
  const inputField = document.getElementById("passcode-input");
  const errorMsg = document.getElementById("error-msg");

  if (inputField && inputField.value === CORRECT_PASSWORD) {
    document.getElementById("step-password").classList.add("hidden");
    document.getElementById("step-photos").classList.remove("hidden");
  } else if (errorMsg) {
    errorMsg.classList.remove("hidden");
  }
}

function showCakeSection() {
  document.getElementById("step-photos").classList.add("hidden");
  document.getElementById("step-cake").classList.remove("hidden");
}

// Notes Data (10 notes total: 5 right, 5 left)
const popNotesData = [
  "✨ Seeing how hard you work inspires me daily.",
  "💖 Having you by my side is my favourite privilege.",
  "👑 You deserve every bit of happiness and peace.",
  "🌸 Thank you for being your wonderful self.",
  "✨ Your smile makes every day so much brighter.",
  "💖 Wishing you a year full of love and success.",
  "💫 You bring so much joy into my life every day.",
  "🌷 So grateful for all the sweet memories we share.",
  "⭐ Keep shining bright and chasing your dreams.",
  "💌 Forever cheering for you in everything you do!"
];

// Screen coordinate presets (5 on Right Top down, 5 on Left Top down)
const notePositions = [
  { top: "6%", right: "4%" },   // Right 1
  { top: "20%", right: "4%" },  // Right 2
  { top: "34%", right: "4%" },  // Right 3
  { top: "48%", right: "4%" },  // Right 4
  { top: "62%", right: "4%" },  // Right 5
  { top: "6%", left: "4%" },    // Left 1
  { top: "20%", left: "4%" },   // Left 2
  { top: "34%", left: "4%" },   // Left 3
  { top: "48%", left: "4%" },   // Left 4
  { top: "62%", left: "4%" }    // Left 5
];

let cakeTapped = false;

function handleCakeTap() {
  if (cakeTapped) return;
  cakeTapped = true;

  const flame = document.getElementById("flame");
  const smoke = document.getElementById("smoke");
  const hint = document.getElementById("cake-tap-hint");

  if (flame) flame.classList.add("hidden");
  if (smoke) smoke.classList.remove("hidden");
  if (hint) hint.innerText = "✨ Sending your birthday wishes... ✨";

  triggerHeartConfetti();

  // Spawn notes across full screen one by one
  popNotesData.forEach((noteText, index) => {
    setTimeout(() => {
      spawnScreenNote(noteText, notePositions[index % notePositions.length]);

      if (index === popNotesData.length - 1) {
        setTimeout(() => {
          if (hint) hint.classList.add("hidden");
          const readBtn = document.getElementById("read-letter-btn");
          if (readBtn) readBtn.classList.remove("hidden");
          triggerHeartConfetti();
        }, 1000);
      }
    }, (index + 1) * 1000);
  });
}

function spawnScreenNote(text, pos) {
  const noteEl = document.createElement("div");
  noteEl.className = "pop-note full-screen-note";
  noteEl.innerText = text;

  if (pos.top) noteEl.style.top = pos.top;
  if (pos.right) noteEl.style.right = pos.right;
  if (pos.left) noteEl.style.left = pos.left;

  document.body.appendChild(noteEl);
}

// Transition to Letter with Heart Confetti
function showLetterSection() {
  const screenNotes = document.querySelectorAll(".full-screen-note");
  screenNotes.forEach(note => note.remove());

  document.getElementById("step-cake").classList.add("hidden");
  document.getElementById("step-letter").classList.remove("hidden");
  
  triggerHeartConfetti();
}

// Transition to Video Section
function showVideoSection() {
  document.getElementById("step-letter").classList.add("hidden");
  document.getElementById("step-video").classList.remove("hidden");

  triggerHeartConfetti();

  const video = document.getElementById("birthday-video");
  if (video) {
    video.play().catch(() => {
      // Auto-play prevented by browser policy; user can click play manually
    });
  }
}

// Heart Confetti Trigger
function triggerHeartConfetti() {
  if (typeof confetti === "function") {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: '❤️', scalar });

    confetti({
      shapes: [heart],
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      scalar
    });
  }
}