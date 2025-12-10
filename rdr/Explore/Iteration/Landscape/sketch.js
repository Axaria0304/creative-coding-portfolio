function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0);
  strokeWeight(1);


  let vanishX = width / 2;
  let vanishY = -120;

  let spread = width * 6;
  let step = 40;

  for (let x2 = -spread; x2 < spread; x2 += step) {
    let y2 = height + 300;
    line(vanishX, vanishY, x2, y2);
  }
}