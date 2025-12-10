let y = 0;
let x = 0;
let y1 = 0;
let x1 = 0;
let y2 = 0;
let x2 = 0;
let y3 = 0;
let x3 = 0;
let y4 = 0;
let x4 = 0;
let y5 = 0;
let x5 = 0;
let y6 = 0;
let x6 = 0;
let y7 = 0;
let x7 = 0;
let y8 = 0;
let x8 = 0;
let y9 = 0;
let x9 = 0;
let y10 = 0;
let x10 = 0;
let s1 = 100;
let s2 = 380
let a = 5
let w1 = 100
let w2 = -100
let speed = 3;
let hight = 10
let diameter = 300


function setup() {
    createCanvas(800, 1000);
    ellipseMode(CENTER)
    angleMode(DEGREES)
    frameRate(20)
    r = g = b = 0;
  background (0, 0 ,0)

}

function draw() {
    background(0, 0, );

    push()
    y += 5;
    y = y % height;
    x = w1 * sin(frameCount * 2);
    translate(0 + x, y);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    y1 += 10;
    y1 = y1 % 900;
    x1 = w2 * sin(frameCount);
    translate(80 + x1, y1);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()
    push()
    y2 += 4;
    y2 = y2 % 870;
    x2 = w1 * sin(frameCount * 2);
    translate(160 + x2, y2);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    y3 += 6;
    y3 = y3 % 1000;
    x3 = w2 * sin(frameCount * 2);
    translate(240 + x3, y3);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()

    push()
    y4 += 5;
    y4 = y4 % 860;
    x4 = w1 * sin(frameCount * 2);
    translate(320 + x4, y4);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    y5 += 10;
    y5 = y5 % 800;
    x5 = w2 * sin(frameCount * 2);
    translate(400 + x5, y5);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()

    push()
    y6 += 10;
    y6 = y6 % 850;
    x6 = w1 * sin(frameCount * 2);
    translate(480 + x6, y6);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    y7 += 5;
    y7 = y7 % 750;
    x7 = w2 * sin(frameCount * 2);
    translate(560 + x7, y7);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()

    push()
    y8 += 7;
    y8 = y8 % 950;
    x8 = w1 * sin(frameCount * 2);
    translate(640 + x8, y8);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    y9 += 10;
    y9 = y9 % 870;
    x9 = w2 * sin(frameCount * 2);
    translate(720 + x9, y9);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()

    push()
    y10 += 5;
    y10 = y10 % 990;
    x10 = w1 * sin(frameCount * 2);
    translate(720 + x10, y10);

    for (let a = hight; a <= 60; a += 5) {
        for (let a = 10; a <= 60; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 0, 0)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 25)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(0, 98, 90)
                rotate(frameCount / s1)
                rect(0, 0, a, a, 20)
            }
        }
    }
    pop()


    push()
    translate(350, 980)
    colorMode(HSB, 360, 100, 100)
    fill(0 )
    ellipse(56, 46, diameter);
    pop()

    push()
  background(0, 0, );
    translate(width / 2, 1000)
    for (let a = hight; a <= 100; a += 5) {
        for (let a = 10; a <= 100; a++) {
            if (a % 2 === 0) {
                ///even
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(197, 98, 0)
                rotate(frameCount / s2)
                rect(0, 0, a, 30, 20, 60, 10, 60)
                //odd
            } else {
                colorMode(HSB, 360, 100, 100)
                noFill()
                strokeWeight(5)
                stroke(196, 3, )
                rotate(frameCount / s2)
                rect(0, 0, a, 30, 10, 60, 20, 60)
            }
        }
    }
    pop()

}