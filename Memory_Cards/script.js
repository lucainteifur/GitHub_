// Espera a que la página esté completamente cargada
document.addEventListener("DOMContentLoaded", (event) => {
  let gameStarted = false;
  let errors = 0;
  let startTime;
  let timeInterval;
  // Array con todas las tarjetas, cada imagen aparece dos veces
  const cardsArray = [
    "images/1.png",
    "images/1.png",
    "images/2.png",
    "images/2.png",
    "images/3.png",
    "images/3.png",
    "images/4.png",
    "images/4.png",
    "images/5.png",
    "images/5.png",
    "images/6.png",
    "images/6.png",
    "images/7.png",
    "images/7.png",
    "images/8.png",
    "images/8.png",
  ];

  // Desordena las tarjetas
  let gameGrid = cardsArray.sort(() => 0.5 - Math.random());

  // Obtiene el elemento del DOM donde se van a insertar las tarjetas
  const game = document.querySelector(".memory-game");

  const popup = document.getElementById("popup");
  const finalTime = document.getElementById("finalTime");
  const finalErrors = document.getElementById("finalErrors");
  const restartButton = document.getElementById("restart");

  // Crea cada tarjeta y la agrega al DOM
  gameGrid.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card");

    const frontFace = document.createElement("div");
    frontFace.classList.add("front-face");

    const backFace = document.createElement("div");
    backFace.classList.add("back-face");
    const img = document.createElement("img");
    img.src = item;
    backFace.appendChild(img);

    cardInner.appendChild(frontFace);
    cardInner.appendChild(backFace);
    card.appendChild(cardInner);

    cardInner.dataset.name = item;

    // Añade un listener de eventos para el clic en la tarjeta
    cardInner.addEventListener("click", flipCard);
    game.appendChild(card);
  });

  let count = 0; // Para contar cuántas tarjetas se han volteado
  let firstGuess = ""; // Para almacenar la primera tarjeta volteada
  let secondGuess = ""; // Para almacenar la segunda tarjeta volteada
  let previousTarget = null; // Para almacenar la última tarjeta clickeada

  // Función que se ejecuta cuando se hace clic en una tarjeta
  function flipCard() {
    let clicked = this; // Tarjeta clickeada

    // Comienza el tiempo en el primer click
    if (!gameStarted) {
      gameStarted = true;
      startTime = Date.now();
      timeInterval = setInterval(() => {
        document.getElementById("timeElapsed").innerText = `Time elapsed: ${Math.floor((Date.now() - startTime) / 1000)} seconds`;
      }, 1000);
    }

    if (clicked === previousTarget || count > 1) {
      return;
    }
    if (clicked === previousTarget || count > 1) {
      return;
    }

    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add("flip");
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add("flip");
      if (firstGuess === secondGuess) {
        setTimeout(matchedGuesses, 600); // Si coinciden, llama a la función para manejar la coincidencia
      } else {
        setTimeout(resetGuesses, 1000); // Si no coinciden, resetea las tarjetas
        errors++;
        document.getElementById("errorCount").innerText = `Number of errors: ${errors}`;
      }
    }
    previousTarget = clicked;
  }

  // Función para resetear las tarjetas no coincidentes
  function resetGuesses() {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    var flippedCards = document.querySelectorAll(".flip");
    flippedCards.forEach((card) => {
      card.classList.remove("flip");
    });
  }

  // Función para manejar las tarjetas coincidentes
  function matchedGuesses() {
    var matchedCards = document.querySelectorAll(".flip");
    matchedCards.forEach((card) => {
      card.classList.add("match");
    });
    resetGuesses();

    // Comprueba si todas las tarjetas han sido emparejadas y detiene el tiempo
    if (document.querySelectorAll(".match").length === gameGrid.length) {
      clearInterval(timeInterval);

      finalTime.innerText = `Final time: ${Math.floor((Date.now() - startTime) / 1000)} seconds`;
      finalErrors.innerText = `Final errors: ${errors}`;

      popup.classList.remove("hidden");
    }
  }
  
  // Reinicia el juego cuando se pulsa el botón de reinicio
  restartButton.addEventListener("click", function() {
    location.reload();
  });

});