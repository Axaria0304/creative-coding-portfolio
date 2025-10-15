let people = [];
let maxPeople = 60;
let spawnChance = 0.05;

// curb (stop) lines
const Y_TOP_CURB = 355;    // for people moving down
const Y_BOTTOM_CURB = 445; // for people moving up

function setup() {
  createCanvas(400, 800);
}

function draw() {
  background(100);

  let isGreen = (frameCount % 600) < 300; // first 300 frames = green
  let isRed   = !isGreen;                 // next 300 frames = red


  // sidewalks
  noStroke();
  fill(166,166,166);
  rect(115, 0, 50, 800);
  rect(235, 0, 50, 800);
  rect(0, 315, 400, 50);
  rect(0, 435, 400, 50);

  // roads
  fill(50);
  rect(165, 0, 70, 800);
  rect(0, 365, 400, 70);

  // crosswalks
  fill(255);
  for (let y = 370; y <= 430; y += 10) {
    rect(115, y, 50, 5);  // left
    rect(235, y, 50, 5);  // right
  }

  // traffic light at (200, 400)
  drawLight(200, 400, isGreen);

  // Spawning people over time
  if (people.length < maxPeople && random() < spawnChance) {
    people.push(new Person());
  }

  for (let p of people) {
    p.update(isRed);
    p.draw();
  }
}

// Traffic light
function drawLight(cx, cy, isGreen) {
  push();
  rectMode(CENTER);
  noStroke();
  fill(30);
  rect(cx, cy, 28, 70, 6);
  fill(isGreen ? 60 : color(255,0,0));  // red (on when not green)
  circle(cx, cy - 20, 14);
  fill(isGreen ? color(0,255,0) : 60);  // green (on when green)
  circle(cx, cy + 20, 14);
  pop();
}

class Person {
  constructor() {
    // lane: left (x 125–155) or right (x 252–275)
    if (random() < 0.5) this.x = random(125, 155);
    else                this.x = random(252, 275);

    // direction: top→down or bottom→up
    if (random() < 0.5) {
      this.y  = -30;            // start above
      this.vy = random(1, 3);   // go down
    } else {
      this.y  = 830;            // start below
      this.vy = random(-3, -1); // go up
    }

    // 15% red, else black
    this.color = (random() < 0.15) ? color(200,10,10) : color(0);

    this.size = 15;
    this.waiting = false;
  }

  update(isRed) {
    // Check if we should stop at the curb while red
    if (isRed) {
      // in either lane?
      let inLeftLane  = (this.x >= 125 && this.x <= 155);
      let inRightLane = (this.x >= 252 && this.x <= 275);
      let inAnyLane   = inLeftLane || inRightLane;

      // going down → stop at Y_TOP_CURB
      if (this.vy > 0 && inAnyLane && this.y < Y_TOP_CURB && this.y + this.vy >= Y_TOP_CURB) {
        this.y = Y_TOP_CURB;
        this.waiting = true;
      }

      // going up → stop at Y_BOTTOM_CURB
      if (this.vy < 0 && inAnyLane && this.y > Y_BOTTOM_CURB && this.y + this.vy <= Y_BOTTOM_CURB) {
        this.y = Y_BOTTOM_CURB;
        this.waiting = true;
      }
    }

    // If light turned green, resume
    if (this.waiting && !isRed) {
      this.waiting = false;
    }

    // Move only if not waiting
    if (!this.waiting) {
      this.y += this.vy;
    }

    // Respawn when off screen ends
    if (this.y < -30 || this.y > 830) {
      this.respawn();
    }
  }

  respawn() {
    if (random() < 0.5) this.x = random(125, 155);
    else                this.x = random(252, 275);

    // direction
    if (random() < 0.5) {
      this.y  = -30;
      this.vy = random(1, 3);
    } else {
      this.y  = 830;
      this.vy = random(-3, -1);
    }

    // 20% red on respawn
    this.color = (random() < 0.2) ? color(200,10,10) : color(0);

    this.waiting = false;
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}