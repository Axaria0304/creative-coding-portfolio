function setup() {
  createCanvas(800, 800);
  background(0);

  let margin = width / 15;
  let lineCount = 8;
  let spacing = (width - 2 * margin) / (lineCount - 1);

  strokeWeight(5);
  stroke(255);
  for (let i = 0; i < lineCount; i++) {
    let x1 = margin;
    let y1 = margin + i * spacing;
    let x2 = margin + i * spacing;
    let y2 = height - margin;
    line(x1, y1, x2, y2);
  }
}

