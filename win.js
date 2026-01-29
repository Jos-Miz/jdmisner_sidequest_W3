// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawWin() → what the win screen looks like
// 2) input handlers → how the player returns to the start screen
//
// This file is intentionally very similar to lose.js.
// The goal is to show that win/lose screens are often
// simple “end states” with minimal logic.

// ------------------------------------------------------------
// Main draw function for win screen
// ------------------------------------------------------------
// drawWin() is called from main.js
// only when currentScreen === "win"
function drawWin() {
  background(210, 255, 220);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(34);
  text("SYSTEM STATUS: STABLE", width / 2, 280);

  textSize(18);
  text("Breach contained.\nBuilding secured.", width / 2, 340);

  textSize(16);
  text("Click or press R to return to Start.", width / 2, 410);
}

function winMousePressed() {
  currentScreen = "start";
}

function winKeyPressed() {
  if (key === "r" || key === "R") currentScreen = "start";
}
