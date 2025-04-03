// Variables
let playerName = "";
let credits = 100;
let currentSpin = 0;
const maxSpins = 3;

// Elementos del DOM
const nameScreen = document.getElementById("name-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const nameInput = document.getElementById("name-input");
const playerNameDisplay = document.getElementById("player-name");
const creditsDisplay = document.getElementById("credits");
const confidenceQuestion = document.getElementById("confidence-question");
const betSection = document.getElementById("bet-section");
const spinBtn = document.getElementById("spin-btn");

// Inicio: Pedir nombre
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = nameInput.value.trim();
  if (playerName) {
    playerNameDisplay.textContent = playerName;
    nameScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    showConfidenceQuestion();
  } else {
    alert("¡Escribe tu nombre!");
  }
});

// Mostrar pregunta de confianza
function showConfidenceQuestion() {
  confidenceQuestion.classList.remove("hidden");
  betSection.classList.add("hidden");
}

// Confirmar confianza y mostrar apuestas
document.getElementById("confirm-confidence").addEventListener("click", () => {
  const confidence = parseInt(document.getElementById("confidence-input").value);
  if (confidence >= 1 && confidence <= 10) {
    confidenceQuestion.classList.add("hidden");
    betSection.classList.remove("hidden");
  } else {
    alert("¡Escribe un número del 1 al 10!");
  }
});

// Girar ruleta
spinBtn.addEventListener("click", () => {
  const betAmount = parseInt(document.getElementById("bet-amount").value);
  const selectedColor = document.querySelector(".color-btn.active")?.dataset.multiplier;

  if (!betAmount || betAmount > credits || !selectedColor) {
    alert("¡Apuesta inválida!");
    return;
  }

  // Simular ruleta
  const result = spinRoulette();
  const multiplier = result.multiplier;
  const win = betAmount * multiplier;

  credits -= betAmount;
  credits += win;
  creditsDisplay.textContent = credits;

  document.getElementById("result").innerHTML = `
    <p>¡Ha salido <span style="color:${result.color}">${result.color.toUpperCase()}</span>!</p>
    <p>${win > 0 ? `Ganaste ${win} créditos` : "Perdiste tu apuesta"}.</p>
  `;

  currentSpin++;
  if (currentSpin >= maxSpins) {
    setTimeout(() => {
      gameScreen.classList.add("hidden");
      endScreen.classList.remove("hidden");
    }, 2000);
  } else {
    setTimeout(showConfidenceQuestion, 2000);
  }
});

// Seleccionar color
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Función ruleta (simplificada)
function spinRoulette() {
  const random = Math.random();
  if (random < 0.7) return { color: "red", multiplier: 2 };    // 70%
  if (random < 0.9) return { color: "black", multiplier: 0 };  // 20%
  return { color: "green", multiplier: 10 };                   // 10%
}
