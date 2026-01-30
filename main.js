// ------------------------------------------------------------
// main.js = the “router” (traffic controller) for the whole game
// ------------------------------------------------------------
//
// This project has multiple screens (start, instr, game, win, lose).
// Each screen lives in its own file and defines:
//   1) drawX()                    → how that screen looks
//   2) XMousePressed / XKeyPressed → how that screen handles input
//
// main.js does 3 jobs:
//   A) store currentScreen in one shared variable
//   B) call the correct draw function each frame
//   C) route mouse/keyboard input to the correct screen handler

// ------------------------------
// Global game state (shared)
// ------------------------------
let currentScreen = "start"; // "start" | "instr" | "game" | "win" | "lose"

// ------------------------------
// setup() runs once
// ------------------------------
function setup() {
  createCanvas(900, 600); // match the game.js button positions nicely
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
}

// ------------------------------
// draw() runs every frame
// ------------------------------
function draw() {
  switch (currentScreen) {
    case "start":
      drawStart();
      break;

    case "instr":
      drawInstr();
      break;

    case "game":
      drawGame();
      break;

    case "win":
      drawWin();
      break;

    case "lose":
      drawLose();
      break;

    default:
      // fallback (in case currentScreen gets set incorrectly)
      background(30);
      fill(255);
      textSize(20);
      text("Unknown screen: " + currentScreen, width / 2, height / 2);
      break;
  }
}

// ------------------------------
// mousePressed() routes clicks
// ------------------------------
function mousePressed() {
  switch (currentScreen) {
    case "start":
      // call only if it exists
      startMousePressed?.();
      break;

    case "instr":
      instrMousePressed?.();
      break;

    case "game":
      gameMousePressed?.();
      break;

    case "win":
      winMousePressed?.();
      break;

    case "lose":
      loseMousePressed?.();
      break;
  }
}

// ------------------------------
// keyPressed() routes keys
// ------------------------------
function keyPressed() {
  switch (currentScreen) {
    case "start":
      startKeyPressed?.();
      break;

    case "instr":
      instrKeyPressed?.();
      break;

    case "game":
      gameKeyPressed?.(); // optional for accessibility
      break;

    case "win":
      winKeyPressed?.();
      break;

    case "lose":
      loseKeyPressed?.();
      break;
  }
}

// ------------------------------------------------------------
// Shared helper: isHover()
// ------------------------------------------------------------
// Buttons are drawn using rectMode(CENTER)
// so x,y represent the CENTER of the rectangle.
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
