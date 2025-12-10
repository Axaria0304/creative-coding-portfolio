let numCircles = 7;

let margin = 60;

function setup() {
  createCanvas(800, 800);
  background(250);
  strokeWeight(5)
  stroke(0);
  fill(200);
  
  let spacing = (width - 2 * margin) / (numCircles - 1);
  let circleSize = 100;

  for (let i = 0; i < numCircles; i++) {
    let x = margin + i * spacing;

    let y = height / 2;

    circle(x, y, circleSize);
  }
}