function setup() {
  createCanvas(800, 800);
  noStroke();
  background(0);

  let numRects = 10;
  let spacing = width / numRects;

  for (let i = 0; i < numRects; i++) {
    let x = i * spacing;

    let h = 100 + i * 50;

    let y = height - h;

    let r = 150 + i * 20; // red component
    let g = 30 + i * 5;   // small green component for warmth
    let b = 10 + i * 10;  // small blue component for warmth
    fill(r, g, b);

    rect(x + 5, y, spacing - 10, h);
  }
}
