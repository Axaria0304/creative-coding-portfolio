function setup() {
    createCanvas(600, 600);
    rectMode(CENTER); ///MAKING CENTER POINT INT THE MIDDLE OF FIGURE
    angleMode(DEGREES)
    frameRate(20)
}

function draw() {
    background(25, 25, );

    //translate(100, 100) //move 100 pixels, moving
    //scale(0.5, 1.5);

    ///top left
    push()
    strokeWeight(5)

    push()
    push()
    fill(0, 0, 0)
    colorMode(HSB, 255)
    stroke(random(360), 40, 150)
    triangle(0, 100, 100, 0, -100, 0);
    pop()
    colorMode(HSB, 255)
    fill(random(360), 40, 150)
    triangle(0, 50, 150, 0, -150, 0);
    pop()

    ///top right
    push()
    translate(600, 0)
    push()
    fill(0, 0, 0)
    colorMode(HSB, 255)
    stroke(random(360), 40, 150)
    triangle(0, 100, 100, 0, -100, 0);
    pop()
    colorMode(HSB, 255)
    fill(random(360), 40, 150)
    triangle(0, 50, 150, 0, -150, 0);
    pop()

    //down left
    push()
    translate(0, 600)
    push()
    fill(0, 0, 0)
    colorMode(HSB, 255)
    stroke(random(360), 40, 150)
    triangle(0, -100, -100, 0, 100, 0);
    pop()
    colorMode(HSB, 255)
    fill(random(360), 40, 150)
    triangle(0, -50, -150, 0, 150, 0);
    pop()

    //down left
    push()
    translate(600, 600)
    push()
    fill(0, 0, 0)
    colorMode(HSB, 255)
    stroke(random(360), 40, 150)
    triangle(0, -100, -100, 0, 100, 0);
    pop()
    colorMode(HSB, 255)
    fill(random(360), 40, 150)
    triangle(0, -50, -150, 0, 150, 0);
    pop()



    // rotation always happens abot (0, 0) point or the origin
    push()
    translate(width / 2, height / 2)

    //triangle black

    for (let i = 4; i <= 14; i += 2) {
        push()
        noFill()
        stroke(0, 0, 0)
        strokeWeight(5)
        rotate((frameCount * i) / 3)
        triangle(0, 200, 200, 0, -200, 0);
        pop()
    }

    ///triangle color
    for (let i = 5; i <= 15; i += 2) {
        push()
        noFill()
        colorMode(HSB, 255)
        stroke(random(360), 40, 150)
        strokeWeight(5)
        rotate((frameCount * i) / 3)
        triangle(0, 200, 200, 0, -200, 0);
        pop()
    }

    //red rect
    fill(255, 0, 0)
    rotate(frameCount)
    rect(0, 0, 200, 200)

    // black rect
    fill(0, 0, 0)
    rotate(frameCount)
    rect(0, 0, 100, 100)

    push()


    // red/ black stroke rect

    for (let i = 85; i <= 155; i += 5) {
        for (let i = 85; i <= 155; i++) {
            if (i % 2 === 0) {

                noFill()
                strokeWeight(5)
                stroke(255, 0, 0)
                rotate(frameCount / 4)
                rect(0, 0, i, i)

            } else {
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / 4)
                rect(0, 0, i, i)
            }
        }
    }



    pop()



}