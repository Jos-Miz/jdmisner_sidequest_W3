// ------------------------------------------------------------
// main.js = the “router” (traffic controller) for the whole game
// ------------------------------------------------------------
//
// Idea: this project has multiple screens (start, instructions, game, win, lose).
// Instead of putting everything in one giant file, each screen lives in its own
// file and defines two main things:
//   1) drawX()         → how that screen looks
//   2) XMousePressed() / XKeyPressed() → how that screen handles input
//
// This main.js file does 3 important jobs:
//   A) stores the current screen in a single shared variable
//   B) calls the correct draw function each frame
//   C) sends mouse/keyboard input to the correct screen handler

// ------------------------------
// Global game state
// ------------------------------
// This variable is shared across all files because all files run in the same
// global JavaScript scope when loaded in index.html.
//

let scene = "shop";
let trust = 0; // player stat that changes with choices

// We store the “name” of the current screen as a string.
// Only one screen should be active at a time.
let currentScreen = "start"; // "start" | "instr" | "game" | "win" | "lose"

// ------------------------------
// setup() runs ONCE at the beginning
// ------------------------------
// This is where you usually set canvas size and initial settings.
function setup() {
  createCanvas(800, 800);

  // Sets a default font for all text() calls
  // (This can be changed later per-screen if you want.)
  textFont("sans-serif");
}

// ------------------------------
// draw() runs every frame (many times per second)
// ------------------------------
// This is the core “router” for visuals.
// Depending on currentScreen, we call the correct draw function.
function draw() {
  // Each screen file defines its own draw function:
  //   start.js         → drawStart()
  //   instructions.js  → drawInstr()
  //   game.js          → drawGame()
  //   win.js           → drawWin()
  //   lose.js          → drawLose()

  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();

  if (scene === "shop") drawSceneShop();
  else if (scene === "water") drawSceneWater();
  else if (scene === "test") drawSceneTest();
  else if (scene === "ending") drawSceneEnding();

  // (Optional teaching note)
  // This “if/else chain” is a very common early approach.
  // Later in the course you might replace it with:
  // - a switch statement, or
  // - an object/map of screens
}

// ------------------------------
// mousePressed() runs once each time the mouse is clicked
// ------------------------------
// This routes mouse input to the correct screen handler.
function mousePressed() {
  // Each screen *may* define a mouse handler:
  // start.js         → startMousePressed()
  // instructions.js  → instrMousePressed()
  // game.js          → gameMousePressed()
  function drawHUD() {
    // Trust display (simple + clear for marking)
    textAlign(LEFT, TOP);
    textSize(18);
    fill(0);
    text("Trust: " + trust, 20, 20);
  }

  function drawSceneShop() {
    background(240);
    drawHUD();

    textAlign(CENTER, CENTER);
    textSize(28);
    fill(0);
    text("Mysterious Plant Shop", width / 2, 140);

    textSize(18);
    text(
      "The owner says: “Pick one plant… but follow my rules.”",
      width / 2,
      240,
    );
    text("1) Ask what the plant needs  (+1 trust)", width / 2, 320);
    text("2) Pretend you already know (-1 trust)", width / 2, 360);

    textSize(14);
    text("Press 1 or 2", width / 2, 430);
  }

  function drawSceneWater() {
    background(235);
    drawHUD();

    textAlign(CENTER, CENTER);
    textSize(24);
    fill(0);
    text("Watering Decision", width / 2, 170);

    textSize(18);
    text("The soil looks slightly damp.", width / 2, 240);
    text("1) Water a little  (+1 trust)", width / 2, 320);
    text("2) Water a lot     (-1 trust)", width / 2, 360);

    textSize(14);
    text("Press 1 or 2", width / 2, 430);
  }

  function drawSceneTest() {
    background(230);
    drawHUD();

    textAlign(CENTER, CENTER);
    textSize(24);
    fill(0);
    text("One Last Test", width / 2, 170);

    textSize(18);
    text("Where do you place the plant?", width / 2, 240);
    text("1) Indirect light (+1 trust)", width / 2, 320);
    text("2) Direct sun     (-1 trust)", width / 2, 360);

    textSize(14);
    text("Press 1 or 2", width / 2, 430);
  }

  function drawSceneEnding() {
    background(245);
    drawHUD();

    textAlign(CENTER, CENTER);
    textSize(26);
    fill(0);

    if (trust >= 2) {
      text("The owner smiles.", width / 2, 240);
      textSize(18);
      text("“You’re ready.” You receive a rare cutting.", width / 2, 290);
      text("Press ENTER to continue.", width / 2, 380);
    } else {
      text("The owner shakes their head.", width / 2, 240);
      textSize(18);
      text("“Not yet.” You’re asked to leave.", width / 2, 290);
      text("Press ENTER to continue.", width / 2, 380);
    }
  }

  function gameKeyPressed() {
    // Choice input for scenes
    if (scene === "shop") {
      if (key === "1") {
        trust += 1;
        scene = "water";
      } else if (key === "2") {
        trust -= 1;
        scene = "water";
      }
    } else if (scene === "water") {
      if (key === "1") {
        trust += 1;
        scene = "test";
      } else if (key === "2") {
        trust -= 1;
        scene = "test";
      }
    } else if (scene === "test") {
      if (key === "1") {
        trust += 1;
        scene = "ending";
      } else if (key === "2") {
        trust -= 1;
        scene = "ending";
      }
    } else if (scene === "ending") {
      if (keyCode === ENTER) {
        // Unlock ending based on trust
        if (trust >= 2) currentScreen = "win";
        else currentScreen = "lose";
      }
    }
  }

  // win.js           → winMousePressed()
  // lose.js          → loseMousePressed()

  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "game") gameMousePressed();
  // The ?.() means “call this function only if it exists”
  // This prevents errors if a screen doesn’t implement a handler.
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

// ------------------------------
// keyPressed() runs once each time a key is pressed
// ------------------------------
// This routes keyboard input to the correct screen handler.
function keyPressed() {
  // Each screen *may* define a key handler:
  // start.js         → startKeyPressed()
  // instructions.js  → instrKeyPressed()
  // game.js          → gameKeyPressed()
  // win.js           → winKeyPressed()
  // lose.js          → loseKeyPressed()

  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "game") gameKeyPressed?.();
  else if (currentScreen === "win") winKeyPressed?.();
  else if (currentScreen === "lose") loseKeyPressed?.();
}

function resetStory() {
  scene = "shop";
  trust = 0;
}

// ------------------------------------------------------------
// Shared helper function: isHover()
// ------------------------------------------------------------
//
// Many screens have buttons.
// This helper checks whether the mouse is inside a rectangle.
//
// Important: our buttons are drawn using rectMode(CENTER),
// meaning x,y is the CENTRE of the rectangle.
// So we check mouseX and mouseY against half-width/half-height bounds.
//
// Input:  an object with { x, y, w, h }
// Output: true if mouse is over the rectangle, otherwise false
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 && // mouse is right of left edge
    mouseX < x + w / 2 && // mouse is left of right edge
    mouseY > y - h / 2 && // mouse is below top edge
    mouseY < y + h / 2 // mouse is above bottom edge
  );
}
