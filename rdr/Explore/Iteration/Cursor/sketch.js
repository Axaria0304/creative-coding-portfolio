let l1;
let l2;
let l3;
let sz = 2000

function setup() {
  createCanvas(sz, sz);
  
  l1 = createGraphics(sz, sz);
  l2 = createGraphics(sz-1000, sz-1000);
  l3 = createGraphics(sz-1500, sz-1500);
}

function draw() {
  background(0);
  l1.background(0);
  l2.background(25, 25);
  l3.background(0);


  let numPoints = 40;
  let spacing = 2000 / (numPoints + 1);


    for (let i = 1; i <= numPoints; i++) {
    let x = i * spacing;
    let y = 2000 / 2;
    
    l1.stroke(255);
    l1.strokeWeight(2);
    l1.line(x, y, mouseX, mouseY);
    
    push()
    l1.fill(0);
    l1.noStroke();
    l1.circle(x, y, 8);
    l1.stroke(155);
    pop()

    imageMode(CENTER)
    image(l1,sz/2, sz/2);
  }

    for (let i = 1; i <= numPoints; i++) {
    let x = i * spacing-500;
    let y = 1000 / 2;

    l2.stroke(139, 0, 0);
    l2.strokeWeight(2);
    l2.line(x, y, mouseX -500, mouseY- 500);

    l2.fill(25, 25)
    l2.noStroke();
    l2.circle(x, y, 8);
    l2.stroke(155);

    imageMode(CENTER)
    image(l2,sz/2,sz/2);
  }

   for (let i = 1; i <= numPoints; i++) {
    let x = i * spacing-750;
    let y = 500 / 2;

    l3.stroke(255);
    l3.strokeWeight(2);
    l3.line(x, y, mouseX -750, mouseY- 750);

    l3.fill(0)
    l3.noStroke();
    l3.circle(x, y, 8);
    l3.stroke(155);

    imageMode(CENTER)
    image(l3,sz/2,sz/2);
  }

}

