// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Cafe story state (ADD THIS)
// ------------------------------
let cafeScene = "temp"; // "temp" -> "taste"
let drinkTemp = ""; // "hot" or "cold"
let drinkTaste = ""; // "sweet" or "bitter"
let cafeResult = ""; // sentence shown on win screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.
const gameBtn = {
  x: 400, // x position (centre of the button)
  y: 550, // y position (centre of the button)
  w: 260, // width
  h: 90, // height
  label: "PRESS HERE", // text shown on the button
};

// ------------------------------
// Main draw function for this screen
// ------------------------------
// drawGame() is called from main.js *only*
// when currentScreen === "game"
function drawGame() {
  background(240, 230, 140);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("Café Order", width / 2, 140);

  textSize(18);

  if (cafeScene === "temp") {
    text("How do you want your drink?", width / 2, 240);
    text("1) Hot", width / 2, 310);
    text("2) Cold", width / 2, 350);
    textSize(14);
    text("Press 1 or 2", width / 2, 430);
  } else if (cafeScene === "taste") {
    text("What kind of taste do you want?", width / 2, 240);
    text("1) Sweet", width / 2, 310);
    text("2) Bitter", width / 2, 350);
    textSize(14);
    text("Press 1 or 2", width / 2, 430);
  }
}

// ---- Draw the button ----
// We pass the button object to a helper function
drawGameButton(gameBtn);

// ---- Cursor feedback ----
// If the mouse is over the button, show a hand cursor
// Otherwise, show the normal arrow cursor
cursor(isHover(gameBtn) ? HAND : ARROW);

// ------------------------------
// Button drawing helper
// ------------------------------
// This function is responsible *only* for drawing the button.
// It does NOT handle clicks or game logic.
function drawGameButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is hovering over the button
  // isHover() is defined in main.js so it can be shared
  const hover = isHover({ x, y, w, h });

  noStroke();

  // Change button colour when hovered
  // This gives visual feedback to the player
  fill(
    hover
      ? color(180, 220, 255, 220) // lighter blue on hover
      : color(200, 220, 255, 190), // normal state
  );

  // Draw the button rectangle
  rect(x, y, w, h, 14); // last value = rounded corners

  // Draw the button text
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------
// Mouse input for this screen
// ------------------------------
// This function is called from main.js
// only when currentScreen === "game"
function gameMousePressed() {
  // no mouse interaction needed for this one
}

// ------------------------------
// Keyboard input for this screen
// ------------------------------
// Allows keyboard-only interaction (accessibility + design)
function gameKeyPressed() {
  // Screen 1: temperature choice
  if (cafeScene === "temp") {
    if (key === "1") {
      drinkTemp = "hot";
      cafeScene = "taste";
    }
    if (key === "2") {
      drinkTemp = "cold";
      cafeScene = "taste";
    }
  }

  // Screen 2: taste choice -> compute result -> go to win screen
  else if (cafeScene === "taste") {
    if (key === "1") drinkTaste = "sweet";
    if (key === "2") drinkTaste = "bitter";

    // only continue if they picked 1 or 2
    if (drinkTaste !== "") {
      cafeResult = makeCafeResult(drinkTemp, drinkTaste);
      currentScreen = "win"; // use win as your RESULT screen
    }
  }
}

// ------------------------------
// Game logic: win or lose
// ------------------------------
// This function decides what happens next in the game.
// It does NOT draw anything.
function triggerRandomOutcome() {
  // random() returns a value between 0 and 1
  // Here we use a 50/50 chance:
  // - less than 0.5 → win
  // - 0.5 or greater → lose
  //
  // You can bias this later, for example:
  // random() < 0.7 → 70% chance to win
  if (random() < 0.5) {
    currentScreen = "win";
  } else {
    currentScreen = "lose";
  }
}

function resetCafe() {
  cafeScene = "temp";
  drinkTemp = "";
  drinkTaste = "";
  cafeResult = "";
}

function makeCafeResult(temp, taste) {
  if (temp === "hot" && taste === "sweet") return "A warm, slow morning.";
  if (temp === "hot" && taste === "bitter") return "A quiet focus settles in.";
  if (temp === "cold" && taste === "sweet")
    return "A bright, gentle afternoon.";
  return "A sharp, awake afternoon."; // cold + bitter
}
