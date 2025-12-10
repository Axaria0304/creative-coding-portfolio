let mode = 0;

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
}

function draw() {
  background(25, 25,  ); 

  let stepSize = 5;
  let speed = 0.02;
  if (mode === 0) {
    // ----- version 1 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;
      let y = map(sin(angle), -1, 1, height / 9, (2 * height) / 4);

      if (cos(angle) > 0) {
        fill(139, 0, 0); // dark red = going up
      } else {
        fill(255, 102, 102); // light red = going down
      }
      ellipse(x, y, stepSize);
    }
  } else {
    // ----- version 2 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;

      let y = map(-sin(angle), 1, -1, height / 9, (2 * height) / 4);

      if (cos(angle) > 0) {
        fill(255, 102, 102); // light red = going up
      } else {
        fill(139, 0, 0); // dark red = going down
      }
      ellipse(x, y, stepSize);
    }
  }

   if (mode === 0) {
    // ----- version 1 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;
      let y = map(sin(angle), 1, -1, height / 3, (2 * height) / 4);

      if (cos(angle) > 0) {
        fill(139, 0, 0); // dark red = going up
      } else {
        fill(255, 102, 102); // light red = going down
      }
      ellipse(x, y, stepSize);
    }
  } else {
    // ----- version 2 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;
      let y = map(-sin(angle), -1, 1, height / 3, (2 * height) / 4);

      if (cos(angle) > 0) {
        fill(255, 102, 102); // light red = going up
      } else {
        fill(139, 0, 0); // dark red = going down
      }
      ellipse(x, y, stepSize);
    }
  }

     if (mode === 0) {
    // ----- version 1 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;
      let y = map(sin(angle),- 1, 1, height / 9, (3 * height) / 4);

      if (cos(angle) > 0) {
        fill(139, 0, 0); // dark red = going up
      } else {
        fill(255, 102, 102); // light red = going down
      }
      ellipse(x, y, stepSize);
    }
  } else {
    // ----- version 2 -----
    for (let x = stepSize / 2; x < width; x += stepSize) {
      let angle = frameCount * speed + x;
      let y = map(-sin(angle), 1, -1, height / 9, (3 * height) / 4);

      if (cos(angle) > 0) {
        fill(255, 102, 102); // light red = going up
      } else {
        fill(139, 0, 0); // dark red = going down
      }
      ellipse(x, y, stepSize);
    }
  }
}

function mousePressed() {
  // toggle between 0 and 1
  mode = (mode + 1) % 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
