// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen
// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

// ------------------------------
// Game state (your decision tree)
// ------------------------------
let stability = 0; // starts at 0
let sceneIndex = 0; // 0 = Scene 1, 1 = Scene 2

const scenes = [
  {
    title: "ALERT: Unusual activity detected.",
    body: "Power capacity is limited.\nWhere do you allocate resources?",
    choices: [
      { label: "Security Systems\n(Cameras, locks, alarms)", delta: +1 },
      { label: "Occupant Comfort\n(Lights, HVAC, elevators)", delta: -1 },
    ],
  },
  {
    title: "ALERT: Unauthorized access confirmed.",
    body: "Systems are under strain.",
    choices: [
      {
        label: "Shut System Down\n(Lock doors, cut non-essential power)",
        delta: +1,
      },
      { label: "Keep System Running\n(Maintain normal operation)", delta: -1 },
    ],
  },
];

// Two choice buttons (shared across scenes)
const choiceBtns = [
  { x: 260, y: 520, w: 360, h: 110, label: "" },
  { x: 540, y: 520, w: 360, h: 110, label: "" },
];

// Call this when starting/restarting the game
function resetGame() {
  stability = 0;
  sceneIndex = 0;
}

// ------------------------------
// Main draw function for this screen
// ------------------------------
function drawGame() {
  background(20); // darker, “security system” vibe

  // HUD: stability
  fill(255);
  textAlign(LEFT, TOP);
  textSize(18);
  text(`Stability: ${stability}`, 20, 20);

  // Current scene data
  const scene = scenes[sceneIndex];

  // Title + body
  textAlign(CENTER, TOP);
  textSize(26);
  text(scene.title, width / 2, 90);

  textSize(18);
  text(scene.body, width / 2, 150);

  // Update button labels from the current scene
  choiceBtns[0].label = scene.choices[0].label;
  choiceBtns[1].label = scene.choices[1].label;

  // Draw both buttons
  drawChoiceButton(choiceBtns[0]);
  drawChoiceButton(choiceBtns[1]);

  // Cursor feedback
  const overAny = isHover(choiceBtns[0]) || isHover(choiceBtns[1]);
  cursor(overAny ? HAND : ARROW);
}

// ------------------------------
// Button drawing helper
// ------------------------------
function drawChoiceButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(80, 160, 220) : color(60, 120, 180));
  rect(x, y, w, h, 14);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x, y);
}

// ------------------------------
// Input handlers
// ------------------------------
function gameMousePressed() {
  if (isHover(choiceBtns[0])) choose(0);
  else if (isHover(choiceBtns[1])) choose(1);
}

function gameKeyPressed() {
  // Optional keyboard shortcuts
  // 1 = left option, 2 = right option
  if (key === "1") choose(0);
  if (key === "2") choose(1);
}

// ------------------------------
// Core logic (apply choice -> move forward -> evaluate)
// ------------------------------
function choose(choiceIndex) {
  const scene = scenes[sceneIndex];
  const picked = scene.choices[choiceIndex];

  stability += picked.delta;

  // Move to next scene
  sceneIndex += 1;

  // Scene 3: Outcome evaluation (no choices)
  if (sceneIndex >= scenes.length) {
    if (stability >= 2) currentScreen = "win";
    else currentScreen = "lose";
  }
}

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
  // Set background colour for the game screen
  background(240, 230, 140);

  // ---- Title and instructions text ----
  fill(0); // black text
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Screen", width / 2, 160);

  textSize(18);
  text(
    "Click the button (or press ENTER) for a random result.",
    width / 2,
    210,
  );

  // ---- Draw the button ----
  // We pass the button object to a helper function
  drawGameButton(gameBtn);

  // ---- Cursor feedback ----
  // If the mouse is over the button, show a hand cursor
  // Otherwise, show the normal arrow cursor
  cursor(isHover(gameBtn) ? HAND : ARROW);
}

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
  // Only trigger the outcome if the button is clicked
  if (isHover(gameBtn)) {
    triggerRandomOutcome();
  }
}

// ------------------------------
// Keyboard input for this screen
// ------------------------------
// Allows keyboard-only interaction (accessibility + design)
function gameKeyPressed() {
  // ENTER key triggers the same behaviour as clicking the button
  if (keyCode === ENTER) {
    triggerRandomOutcome();
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
