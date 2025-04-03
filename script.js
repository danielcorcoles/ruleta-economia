// Variables
let jugadorNombre = "";
let creditos = 100;
let tiradas = 0;
const maxTiradas = 3;

// Pantallas
const nombreScreen = document.getElementById("nombre-screen");
const juegoScreen = document.getElementById("juego-screen");
const finalScreen = document.getElementById("final-screen");

// Nombre
document.getElementById("empezar-btn").addEventListener("click", () => {
  jugadorNombre = document.getElementById("nombre-input").value.trim();
  if (jugadorNombre) {
    document.getElementById("jugador-nombre").textContent = jugadorNombre;
    nombreScreen.classList.add("hidden");
    juegoScreen.classList.remove("hidden");
    mostrarConfianzaQuestion();
  } else {
    alert("¡Escribe tu nombre!");
  }
});

// Confianza
function mostrarConfianzaQuestion() {
  document.getElementById("confianza-question").classList.remove("hidden");
  document.getElementById("apuesta-section").classList.add("hidden");
}

document.getElementById("confirmar-confianza").addEventListener("click", () => {
  const confianza = parseInt(document.getElementById("confianza-input").value);
  if (confianza >= 1 && confianza <= 10) {
    document.getElementById("confianza-question").classList.add("hidden");
    document.getElementById("apuesta-section").classList.remove("hidden");
  } else {
    alert("¡Escribe un número del 1 al 10!");
  }
});

// Girar ruleta (usa TU ANIMACIÓN ORIGINAL)
document.getElementById("girar-btn").addEventListener("click", () => {
  const apuesta = parseInt(document.getElementById("apuesta-cantidad").value);
  const colorSeleccionado = document.querySelector(".color-btn.active")?.dataset.multiplicador;

  if (!apuesta || apuesta > creditos || !colorSeleccionado) {
    alert("¡Apuesta inválida!");
    return;
  }

  // Activa tu animación de giro
  const ruleta = document.getElementById("tu-ruleta");
  ruleta.classList.add("giro");

  // Simula resultado después de la animación (3 segundos)
  setTimeout(() => {
    ruleta.classList.remove("giro");
    const resultado = girarRuleta();
    const ganancia = apuesta * resultado.multiplicador;

    creditos -= apuesta;
    creditos += ganancia;
    document.getElementById("creditos").textContent = creditos;

    document.getElementById("resultado").innerHTML = `
      <p>¡Ha salido <span style="color:${resultado.color}">${resultado.color.toUpperCase()}</span>!</p>
      <p>${ganancia > 0 ? `Ganaste ${ganancia} créditos` : "Perdiste tu apuesta"}.</p>
    `;

    tiradas++;
    if (tiradas >= maxTiradas) {
      setTimeout(() => {
        juegoScreen.classList.add("hidden");
        finalScreen.classList.remove("hidden");
      }, 2000);
    } else {
      setTimeout(mostrarConfianzaQuestion, 2000);
    }
  }, 3000); // Espera a que termine la animación
});

// Seleccionar color
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Función para resultado (ajusta probabilidades si quieres)
function girarRuleta() {
  const random = Math.random();
  if (random < 0.7) return { color: "rojo", multiplicador: 2 };   // 70%
  if (random < 0.9) return { color: "negro", multiplicador: 0 };  // 20%
  return { color: "verde", multiplicador: 10 };                   // 10%
}
