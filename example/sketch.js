let mode = 0;

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
}

function draw() {
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
