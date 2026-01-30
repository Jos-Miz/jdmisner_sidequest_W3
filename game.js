// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Cafe story state
// ------------------------------
let cafeScene = "temp"; // "temp" -> "taste"
let drinkTemp = ""; // "hot" or "cold"
let drinkTaste = ""; // "sweet" or "bitter"
let cafeResult = ""; // sentence shown on win screen

// ------------------------------
// Choice button data (2 buttons)
// ------------------------------
const choiceBtn1 = {
  x: 450, // centered for 900px wide canvas; adjust if needed
  y: 320,
  w: 360,
  h: 70,
  label: "",
};

const choiceBtn2 = {
  x: 450,
  y: 410,
  w: 360,
  h: 70,
  label: "",
};

// ------------------------------
// Main draw function for this screen
// ------------------------------
// drawGame() is called from main.js *only*
// when currentScreen === "game"
function drawGame() {
  background(255, 235, 210);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("Café Order", width / 2, 140);

  textSize(18);

  // Update button labels per scene
  if (cafeScene === "temp") {
    text("How do you want your drink?", width / 2, 240);
    choiceBtn1.label = "Hot ☕";
    choiceBtn2.label = "Cold 🧊";
  } else if (cafeScene === "taste") {
    text("What kind of taste do you want?", width / 2, 240);
    choiceBtn1.label = "Sweet 🍯";
    choiceBtn2.label = "Bitter ☕";
  }

  // Draw the buttons
  drawGameButton(choiceBtn1);
  drawGameButton(choiceBtn2);

  // Cursor feedback
  cursor(isHover(choiceBtn1) || isHover(choiceBtn2) ? HAND : ARROW);

  // Optional small helper text (remove if you want)
  textSize(14);
  fill(40);
  text("Click a button (or press 1 / 2)", width / 2, 510);
}

// ------------------------------
// Button drawing helper
// ------------------------------
function drawGameButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(180, 220, 255, 220) : color(200, 220, 255, 190));
  rect(x, y, w, h, 14);

  fill(0);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------
// Mouse input for this screen
// ------------------------------
// This function is called from main.js
// only when currentScreen === "game"
function gameMousePressed() {
  // Screen 1: temperature choice
  if (cafeScene === "temp") {
    if (isHover(choiceBtn1)) {
      drinkTemp = "hot";
      cafeScene = "taste";
      return;
    }
    if (isHover(choiceBtn2)) {
      drinkTemp = "cold";
      cafeScene = "taste";
      return;
    }
  }

  // Screen 2: taste choice -> compute result -> go to win screen
  else if (cafeScene === "taste") {
    if (isHover(choiceBtn1)) drinkTaste = "sweet";
    if (isHover(choiceBtn2)) drinkTaste = "bitter";

    if (drinkTaste !== "") {
      cafeResult = makeCafeResult(drinkTemp, drinkTaste);
      currentScreen = "win"; // using win screen as RESULT screen
    }
  }
}

// ------------------------------
// Keyboard input for this screen (optional accessibility)
// ------------------------------
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
// Helpers / game logic
// ------------------------------
function resetCafe() {
  cafeScene = "temp";
  drinkTemp = "";
  drinkTaste = "";
  cafeResult = "";
}

function makeCafeResult(temp, taste) {
  if (temp === "hot" && taste === "sweet") return "You got a hot mocha.";

  if (temp === "hot" && taste === "bitter") return "You got a hot americano.";

  if (temp === "cold" && taste === "sweet") return "You got an iced mocha.";

  return "You got an iced americano."; // cold + bitter
}
