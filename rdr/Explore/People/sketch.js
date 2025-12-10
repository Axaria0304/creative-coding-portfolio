let people = [];
let maxPeople = 60;
let spawnChance = 0.05;

let cars = [];
const NUM_CARS = 8;

let policeCar;

// curb lines
const Y_TOP_CURB = 355;
const Y_BOTTOM_CURB = 445;

// turning zone for people
const TURN_ZONE_TOP = 350;
const TURN_ZONE_BOTTOM = 450;

// intersection lanes for cars
const X_CENTER_LEFT   = 190;
const X_CENTER_RIGHT  = 210;
const Y_CENTER_TOP    = 380;
const Y_CENTER_BOTTOM = 420;

// stop lines for cars (before intersection)
const RIGHT_STOP_X = 105;
const LEFT_STOP_X  = 290;
const DOWN_STOP_Y  = 350;
const UP_STOP_Y    = 450;

function setup() {
  createCanvas(400, 800);

  // create several normal cars
  for (let i = 0; i < NUM_CARS; i++) {
    cars.push(new Car());
  }

  // create police car
  policeCar = new PoliceCar();
}

function draw() {
  background(100);
//
  policeCar.update();

  let baseIsGreen = (frameCount % 600) < 300;

  // final light states (police can override)
  let isGreen;
  let isRed;
  let verticalCarGreen;
  let horizontalCarGreen;

  if (policeCar.isOnDuty()) {
    isGreen = false;
    isRed = true;
    verticalCarGreen = false;
    horizontalCarGreen = false;
  } else {
    isGreen = baseIsGreen;
    isRed = !isGreen;
    verticalCarGreen = isGreen;
    horizontalCarGreen = !isGreen;
  }

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

  // traffic light people
  drawLightPeople(200, 400, isGreen);

  // car traffic lights:
  drawLightCar(100, 280, horizontalCarGreen); // horizontal
  drawLightCar(300, 520, verticalCarGreen);   // vertical

  // Spawning people over time
  if (people.length < maxPeople && random() < spawnChance) {
    people.push(new Person());
  }

  // update + draw people + count visible ones
  let visiblePopulation = 0;
  for (let p of people) {
    p.update(isRed);
    p.draw();

    if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
      visiblePopulation++;
    }
  }

  // update + draw all normal cars
  for (let c of cars) {
    c.update(horizontalCarGreen, verticalCarGreen);
    c.draw();
  }

  // draw police car on top
  policeCar.draw();

  // population counter
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("Population: " + visiblePopulation, 10, 10);
}

// Traffic light for people
function drawLightPeople(cx, cy, isGreen) {
  push();
  rectMode(CENTER);
  noStroke();
  fill(30);
  rect(cx, cy, 28, 70, 6);
  fill(isGreen ? 60 : color(255,0,0));
  circle(cx, cy - 20, 14);
  fill(isGreen ? color(0,255,0) : 60);
  circle(cx, cy + 20, 14);
  pop();
}

// Traffic light for cars
function drawLightCar(cx, cy, isGreen) {
  push();
  rectMode(CENTER);
  noStroke();
  fill(30);
  rect(cx, cy, 24, 60, 6);
  fill(isGreen ? 60 : color(255,0,0));
  circle(cx, cy - 15, 12);  // red
  fill(isGreen ? color(0,255,0) : 60);
  circle(cx, cy + 15, 12);  // green
  pop();
}

class Person {
  constructor() {
    if (random() < 0.5) {
      this.x = random(125, 155);
      this.isLeftLane = true;
    } else {
      this.x = random(252, 275);
      this.isLeftLane = false;
    }

    // direction: top-down or bottom-up
    if (random() < 0.5) {
      this.y  = -30;
      this.vy = random(0.5, 1.5);
    } else {
      this.y  = 830;
      this.vy = random(-1.5, -0.5);
    }

    this.vx = 0;

    // color: some are red
    this.isRedPerson = random() < 0.2; // 20% red
    if (this.isRedPerson) {
      this.color = color(200,10,10);
    } else {
      this.color = color(0);
    }

    this.ignoresRed = this.isRedPerson;

    this.size = 15;
    this.waiting = false;

    //turn in intersection
    this.willTurn = (random() < 0.30);
    this.hasTurned = false;
  }

  update(isRed) {
    // Turning logic inside intersection zone
    if (!this.hasTurned && this.willTurn &&
        this.y > TURN_ZONE_TOP && this.y < TURN_ZONE_BOTTOM) {

      let speed = max(0.5, abs(this.vy));
      if (this.isLeftLane) {
        this.vx = -speed;
      } else {
        this.vx = speed;
      }
      this.vy = 0;
      this.hasTurned = true;
      this.waiting = false;
    }

    // Curb stopping
    if (isRed && !this.hasTurned && !this.ignoresRed) {
      let inLeftLane  = (this.x >= 125 && this.x <= 155);
      let inRightLane = (this.x >= 252 && this.x <= 275);
      let inAnyLane   = inLeftLane || inRightLane;

      if (this.vy > 0 && inAnyLane && this.y < Y_TOP_CURB && this.y + this.vy >= Y_TOP_CURB) {
        this.y = Y_TOP_CURB;
        this.waiting = true;
      }

      if (this.vy < 0 && inAnyLane && this.y > Y_BOTTOM_CURB && this.y + this.vy <= Y_BOTTOM_CURB) {
        this.y = Y_BOTTOM_CURB;
        this.waiting = true;
      }
    }

    if (this.waiting && !isRed) {
      this.waiting = false;
    }

    if (!this.waiting) {
      this.x += this.vx;
      this.y += this.vy;
    }

    if (this.y < -30 || this.y > 830 || this.x < -50 || this.x > 450) {
      this.respawn();
    }
  }

  respawn() {
    if (random() < 0.5) {
      this.x = random(125, 155);
      this.isLeftLane = true;
    } else {
      this.x = random(252, 275);
      this.isLeftLane = false;
    }

    if (random() < 0.5) {
      this.y  = -30;
      this.vy = random(0.5, 1.5);
    } else {
      this.y  = 830;
      this.vy = random(-1.5, -0.5);
    }

    this.vx = 0;

    this.isRedPerson = random() < 0.2;
    if (this.isRedPerson) {
      this.color = color(200,10,10);
    } else {
      this.color = color(0);
    }
    this.ignoresRed = this.isRedPerson;

    this.waiting = false;
    this.willTurn = (random() < 0.10);
    this.hasTurned = false;
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

class Car {
  constructor() {
    this.size = 15;
    this.width = this.size;
    this.height = this.size;

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.dir = 'right';
    this.waiting = false;
    this.hasTurned = false;
    this.willTurn = false;

    this.blockedByAnyPerson = false;
    this.blockedByRedPerson = false;

    this.reset();
  }

  reset() {
    this.waiting = false;
    this.hasTurned = false;
    this.blockedByAnyPerson = false;
    this.blockedByRedPerson = false;

    let t = floor(random(4));
    let speed = random(1, 2.2);

    if (t === 0) {
      this.dir = 'right';
      this.y = Y_CENTER_TOP;
      this.x = -60 - random(100);
      this.vx = speed;
      this.vy = 0;
    } else if (t === 1) {
      this.dir = 'left';
      this.y = Y_CENTER_BOTTOM;
      this.x = width + 60 + random(100);
      this.vx = -speed;
      this.vy = 0;
    } else if (t === 2) {
      this.dir = 'down';
      this.x = X_CENTER_LEFT;
      this.y = -60 - random(100);
      this.vx = 0;
      this.vy = speed;
    } else {
      this.dir = 'up';
      this.x = X_CENTER_RIGHT;
      this.y = height + 60 + random(100);
      this.vx = 0;
      this.vy = -speed;
    }

    this.willTurn = (random() < 0.5);
  }

  isBlockedByCar() {
    const spacing = this.size + 4;
    let blocked = false;

    for (let other of cars) {
      if (other === this) continue;

      if (this.dir === 'right' && other.dir === 'right' &&
          abs(other.y - this.y) < 5 && other.x > this.x &&
          other.x - this.x < spacing) {
        blocked = true;
      }

      if (this.dir === 'left' && other.dir === 'left' &&
          abs(other.y - this.y) < 5 && other.x < this.x &&
          this.x - other.x < spacing) {
        blocked = true;
      }

      if (this.dir === 'down' && other.dir === 'down' &&
          abs(other.x - this.x) < 5 && other.y > this.y &&
          other.y - this.y < spacing) {
        blocked = true;
      }

      if (this.dir === 'up' && other.dir === 'up' &&
          abs(other.x - this.x) < 5 && other.y < this.y &&
          this.y - other.y < spacing) {
        blocked = true;
      }
    }

    return blocked;
  }

  checkPedestrians(lightGreen) {
    this.blockedByAnyPerson = false;
    this.blockedByRedPerson = false;

    const detectDist = 25;

    for (let p of people) {
      let halfW = this.size / 2 + p.size / 2;
      let halfH = halfW;

      if (this.dir === 'right') {
        if (abs(p.y - this.y) < halfH && p.x > this.x && p.x - this.x < detectDist) {
          this.blockedByAnyPerson = true;
          if (lightGreen && p.isRedPerson) this.blockedByRedPerson = true;
        }
      }

      if (this.dir === 'left') {
        if (abs(p.y - this.y) < halfH && p.x < this.x && this.x - p.x < detectDist) {
          this.blockedByAnyPerson = true;
          if (lightGreen && p.isRedPerson) this.blockedByRedPerson = true;
        }
      }

      if (this.dir === 'down') {
        if (abs(p.x - this.x) < halfW && p.y > this.y && p.y - this.y < detectDist) {
          this.blockedByAnyPerson = true;
          if (lightGreen && p.isRedPerson) this.blockedByRedPerson = true;
        }
      }

      if (this.dir === 'up') {
        if (abs(p.x - this.x) < halfW && p.y < this.y && this.y - p.y < detectDist) {
          this.blockedByAnyPerson = true;
          if (lightGreen && p.isRedPerson) this.blockedByRedPerson = true;
        }
      }
    }
  }

  handleTurning() {
    if (this.hasTurned || !this.willTurn) return;

    let speed = max(abs(this.vx), abs(this.vy));

    if (this.dir === 'right' &&
        this.x < X_CENTER_LEFT && this.x + this.vx >= X_CENTER_LEFT) {
      this.vx = 0;
      if (random() < 0.5) {
        this.dir = 'up';
        this.vy = -speed;
        this.x = X_CENTER_RIGHT;
      } else {
        this.dir = 'down';
        this.vy = speed;
        this.x = X_CENTER_LEFT;
      }
      this.hasTurned = true;
    }

    if (this.dir === 'left' &&
        this.x > X_CENTER_RIGHT && this.x + this.vx <= X_CENTER_RIGHT) {
      this.vx = 0;
      if (random() < 0.5) {
        this.dir = 'up';
        this.vy = -speed;
        this.x = X_CENTER_RIGHT;
      } else {
        this.dir = 'down';
        this.vy = speed;
        this.x = X_CENTER_LEFT;
      }
      this.hasTurned = true;
    }

    if (this.dir === 'down' &&
        this.y < Y_CENTER_TOP && this.y + this.vy >= Y_CENTER_TOP) {
      this.vy = 0;
      if (random() < 0.5) {
        this.dir = 'left';
        this.vx = -speed;
        this.y = Y_CENTER_BOTTOM;
      } else {
        this.dir = 'right';
        this.vx = speed;
        this.y = Y_CENTER_TOP;
      }
      this.hasTurned = true;
    }

    if (this.dir === 'up' &&
        this.y > Y_CENTER_BOTTOM && this.y + this.vy <= Y_CENTER_BOTTOM) {
      this.vy = 0;
      if (random() < 0.5) {
        this.dir = 'left';
        this.vx = -speed;
        this.y = Y_CENTER_BOTTOM;
      } else {
        this.dir = 'right';
        this.vx = speed;
        this.y = Y_CENTER_TOP;
      }
      this.hasTurned = true;
    }
  }

  handleStopLines(lightGreen) {
    let nextX = this.x + this.vx;
    let nextY = this.y + this.vy;

    if (!lightGreen && !this.waiting) {
      if (this.dir === 'right' &&
          this.x + this.width / 2 < RIGHT_STOP_X &&
          nextX + this.width / 2 >= RIGHT_STOP_X) {
        this.x = RIGHT_STOP_X - this.width / 2;
        this.waiting = true;
      }

      if (this.dir === 'left' &&
          this.x - this.width / 2 > LEFT_STOP_X &&
          nextX - this.width / 2 <= LEFT_STOP_X) {
        this.x = LEFT_STOP_X + this.width / 2;
        this.waiting = true;
      }

      if (this.dir === 'down' &&
          this.y + this.height / 2 < DOWN_STOP_Y &&
          nextY + this.height / 2 >= DOWN_STOP_Y) {
        this.y = DOWN_STOP_Y - this.height / 2;
        this.waiting = true;
      }

      if (this.dir === 'up' &&
          this.y - this.height / 2 > UP_STOP_Y &&
          nextY - this.height / 2 <= UP_STOP_Y) {
        this.y = UP_STOP_Y + this.height / 2;
        this.waiting = true;
      }
    }

    if (this.waiting && lightGreen) {
      this.waiting = false;
    }
  }

  update(horizontalGreen, verticalGreen) {
    this.handleTurning();

    let lightGreen =
      (this.dir === 'right' || this.dir === 'left')
        ? horizontalGreen
        : verticalGreen;

    this.handleStopLines(lightGreen);

    let blockedByCar = this.isBlockedByCar();
    this.checkPedestrians(lightGreen);

    if (!this.waiting && !blockedByCar && !this.blockedByAnyPerson) {
      this.x += this.vx;
      this.y += this.vy;
    }

    if (this.x < -80 || this.x > width + 80 ||
        this.y < -80 || this.y > height + 80) {
      this.reset();
    }
  }

  draw() {
    // car body
    push();
    rectMode(CENTER);
    noStroke();
    fill(200, 0, 0);
    rect(this.x, this.y, this.size, this.size);
    pop();

    //text
    if (this.blockedByRedPerson) {
      let boxW = 40;
      let boxH = 18;
      let boxY = this.y - this.size - boxH / 2 - 2;

      push();
      rectMode(CENTER);
      noStroke();
      fill(0);
      rect(this.x, boxY, boxW, boxH, 3);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(10);
      text("move", this.x, boxY);
      pop();
    }
  }
}

//police
class PoliceCar {
  constructor() {
    this.size = 18;
    this.x = -80;
    this.y = Y_CENTER_TOP + 5;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.moving = false;
    this.nextSpawnTime = millis() + 10000;
  }

  isOnDuty() {
    return this.moving;
  }

  startRun() {
    this.moving = true;

    let horizontal = random() < 0.5;

    if (horizontal) {
      let dirRight = random() < 0.5;
      let laneTop = random() < 0.5;
      this.y = (laneTop ? Y_CENTER_TOP : Y_CENTER_BOTTOM) + 5;

      if (dirRight) {
        this.x = -80;
        this.vx = this.speed;
      } else {
        this.x = width + 80;
        this.vx = -this.speed;
      }
      this.vy = 0;
    } else {
      let dirDown = random() < 0.5;
      let laneLeft = random() < 0.5;
      this.x = laneLeft ? X_CENTER_LEFT : X_CENTER_RIGHT;

      if (dirDown) {
        this.y = -80;
        this.vy = this.speed;
      } else {
        this.y = height + 80;
        this.vy = -this.speed;
      }
      this.vx = 0;
    }
  }

  update() {
    let now = millis();

    if (this.moving) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -100 || this.x > width + 100 ||
          this.y < -100 || this.y > height + 100) {
        this.moving = false;
        this.nextSpawnTime = now + 10000;
      }
    } else {
      if (now >= this.nextSpawnTime) {
        this.startRun();
      }
    }
  }

  draw() {
    if (!this.moving) return;

    push();
    rectMode(CENTER);
    noStroke();

    // police car body
    fill(30, 30, 120);
    rect(this.x, this.y, this.size * 1.6, this.size, 4);

    // flashing siren lights
    let blink = (frameCount % 20) < 10;

    fill(blink ? color(255, 0, 0) : color(80));
    rect(this.x - this.size * 0.5, this.y - this.size * 0.7,
         this.size * 0.4, this.size * 0.3, 2);

    fill(blink ? color(0, 150, 255) : color(80));
    rect(this.x + this.size * 0.5, this.y - this.size * 0.7,
         this.size * 0.4, this.size * 0.3, 2);

    pop();
  }
}
