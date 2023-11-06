let fireworks = [];
// To keep track of which firework to show next
let fireworkIndex = -1; 
let nextFireworkTime = 0;
let firework1;
let firework2;
let firework3;
let firework4;
let firework5;
let firework6;
let firework7;
let firework8;
let firework9;
let firework10;
let firework11;
let firework12;
let firework13;
let firework14;
let firework15;
let firework16;
let firework17;
// Control the number of frames in the bloom cycle
let cycleDuration = 2000;
let whiteDots = [];
let isFireworksPlaying = false; 
let displayText = true;
let textTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(18, 88, 116);
  angleMode(DEGREES);
  textTimer = millis();

  // Create 17 fireworks
  firework1 = new Firework(0.14 * width, 0.13 * height, 0.5, 1);
  firework2 = new Firework(0.43 * width, 0.06 * height, 0.5, 1);
  firework3 = new Firework(0.73 * width, -0.01 * height, 0.5, 1);
  firework4 = new Firework(0.04 * width, 0.4 * height, 0.5, 1);
  firework5  = new Firework(0.33 * width, 0.36 * height, 0.5, 0);
  firework6  = new Firework(0.63 * width, 0.27 * height, 0.5, 0);
  firework7  = new Firework(0.95 * width, 0.21 * height, 0.5, 1);
  firework8  = new Firework(-0.02 * width, 0.7 * height, 0.5, 1);
  firework9  = new Firework(0.24 * width, 0.63 * height, 0.5, 0);
  firework10 = new Firework(0.56 * width, 0.56 * height, 0.5, 0);
  firework11 = new Firework(0.86 * width, 0.49 * height, 0.5, 1);
  firework12 = new Firework(0.16 * width, 0.91 * height, 0.5, 1);
  firework13 = new Firework(0.47 * width, 0.85 * height, 0.5, 1);
  firework14 = new Firework(0.76 * width, 0.77 * height, 0.5, 1);
  firework15 = new Firework(width, 0.74 * height, 0.5, 1);
  firework16 = new Firework(0.67 * width, 1.05 * height, 0.5, 1);
  firework17 = new Firework(0.95 * width, height, 0.5, 1);

    fireworks.push(firework1);
    fireworks.push(firework2);
    fireworks.push(firework3);
    fireworks.push(firework4);
    fireworks.push(firework5);
    fireworks.push(firework6);
    fireworks.push(firework7);
    fireworks.push(firework8);
    fireworks.push(firework9);
    fireworks.push(firework10);
    fireworks.push(firework11);
    fireworks.push(firework12);
    fireworks.push(firework13);
    fireworks.push(firework14);
    fireworks.push(firework15);
    fireworks.push(firework16);
    fireworks.push(firework17);
  

  // Create randomly distributed white dots
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 15);
    whiteDots.push(new WhiteDot(x, y, size));
  }
}

function draw() {
  let bgcol = color("#02496C");
  bgcol.setAlpha(5);
  background(bgcol);

  // Draw white dots
  for (let dot of whiteDots) {
    dot.show();
  }

  // Display the instruction text within the first 3 seconds
  if (displayText && millis() - textTimer < 3000) {
    fill(255);
    noStroke();
    textSize(16); 
    textAlign(CENTER, CENTER);
    text("Click the mouse to start or pause the fireworks. Press the space bar to gradually turn the fireworks red over 5 seconds or to restore them.", width / 2, height / 2);
  } else {
    displayText = false; // Stop displaying the text after 3 seconds
  }

  
  //Set the fireworks to bloom at regular intervals
  if (isFireworksPlaying) {
  let currentTime = millis();
  if (currentTime > nextFireworkTime) {
    nextFireworkTime = currentTime + cycleDuration;
    fireworkIndex = (fireworkIndex + 1) % fireworks.length; // Cycle through the fireworks
  }
  for (let i = 0; i <= fireworkIndex; i++) {
    fireworks[i].show();
    fireworks[i].update();
  }
}

// Iterate over all the fireworks to change colour to red
for (let fw of fireworks) {
  if (fw.colorTransition) {
    let transitionTime = millis() - fw.colorTransitionStart;
    let transitionDuration = 5000; // Transition over five seconds.
    if (transitionTime <= transitionDuration) {
      let amt = map(transitionTime, 0, transitionDuration, 0, 1);
      fw.FireworkColor = lerpColor(fw.originalFireworkColor, color('red'), amt);
    } else {
      fw.FireworkColor = fw.originalFireworkColor;
      fw.colorTransition = false; 
    }
  }

}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  firework1.updatePosition(0.14 * width, 0.13 * height);
  firework2.updatePosition(0.43 * width, 0.06 * height);
  firework3.updatePosition(0.73 * width, -0.01 * height);
  firework4.updatePosition(0.04 * width, 0.4 * height);
  firework5.updatePosition(0.33 * width, 0.36 * height);
  firework6.updatePosition(0.63 * width, 0.27 * height);
  firework7.updatePosition(0.95 * width, 0.21 * height);
  firework8.updatePosition(-0.02 * width, 0.7 * height);
  firework9.updatePosition(0.24 * width, 0.63 * height);
  firework10.updatePosition(0.56 * width, 0.56 * height);
  firework11.updatePosition(0.86 * width, 0.49 * height);
  firework12.updatePosition(0.16 * width, 0.91 * height);
  firework13.updatePosition(0.47 * width, 0.85 * height);
  firework14.updatePosition(0.76 * width, 0.77 * height);
  firework15.updatePosition(width, 0.74 * height);
  firework16.updatePosition(0.67 * width, 1.05 * height);
  firework17.updatePosition(0.95 * width, height);

  // Update the position of the white dot
  for (let dot of whiteDots) {
    dot.updatePosition(random(width), random(height));
  }
}

class Firework {
  constructor(x, y, expansionSpeed, rotationSpeed) {
    // firework position
    this.x = x;
    this.y = y;

    this.cycleStartTime = millis();
    this.rotation = 0;
    // Set bloom speed
    this.expansionSpeed = expansionSpeed;
    // Set rotation speed
    this.rotationSpeed = rotationSpeed;

    let colors1 = "CFDDFB-FCA522-E1FFF6-FBD2D9".split("-").map(a => "#" + a);
    this.FireworkColor = color(random(colors1));
    let colors2 = "110671-239940-D9354B-CE57B1-E7853C-089494".split("-").map(a => "#" + a);
    this.circleColor1 = color(random(colors2));
    let colors3 = "2F3333-DF4558-58A06B-75B5E0-BA5BD8".split("-").map(a => "#" + a);
    this.circleColor2 = color(random(colors3));
    this.circleColor3 = color(random(colors3));
    this.circleColor4 = color(random(colors3));

    //set colour transition
    this.colorTransition = false;
    this.colorTransitionStart = 0;
    this.originalFireworkColor = this.FireworkColor; 
  }


// start or stop colour transition
  toggleColorTransition() {
  this.colorTransition = !this.colorTransition; // 切换颜色变化状态
    this.colorTransitionStart = millis(); // 记录开始变化的时间
}

  // draw fireworks
  show() {
    push();
    translate(this.x, this.y);
    fill(this.FireworkColor);
    noStroke();

    // Set time
    let time = millis() - this.cycleStartTime;
    let t = (time % cycleDuration) / cycleDuration; 
    let size = map(t, 0, 1, 0, min(windowWidth, windowHeight) / 6);

    // handle the colour transition
    if (this.transitionToRed) {
      let transitionTime = millis() - this.transitionStartTime;
      let lerpAmt = map(transitionTime, 0, 5000, 0, 1);
      lerpAmt = constrain(lerpAmt, 0, 1); // 确保不会超出0-1的范围
      let targetColor = color(255, 0, 0); // 目标颜色为红色
      let currentColor = lerpColor(this.FireworkColor, targetColor, lerpAmt);
      fill(currentColor);
    } else {
      fill(this.FireworkColor);
    }

    // Update rotation speed
    this.rotation += this.rotationSpeed;
    rotate(this.rotation);

    for (let i = 0; i < 360; i += 10) {
      let ex = size * sin(i);
      let ey = size * cos(i);
      ellipse(ex, ey, 10, 10);
      circle(ex, ey, 10);

      push();
      fill(this.circleColor1);
      circle(ex, ey, 5)
      pop();
    }
    fill(this.circleColor2)
    circle(0, 0, 50)

    fill(this.circleColor3)
    circle(0, 0, 40)

    fill(this.circleColor4)
    circle(0, 0, 20)

    pop();
  }

  // Fireworks bloom repeatedly
  update() {
    if (millis() - this.cycleStartTime >= cycleDuration) {
      this.cycleStartTime = millis();
    }
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
  }


class WhiteDot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

function mousePressed() {
  isFireworksPlaying = !isFireworksPlaying; 
}

function keyPressed() {
  if (key === ' ') {
    for (let fw of fireworks) {
      fw.toggleColorTransition();
    }
  }
}