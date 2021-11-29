// Fork of: https://openprocessing.org/sketch/957759

let _nsRate;
let _maxPoint;
let _aryObject = [];
let _objectNum;
let _bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();
  _objectNum = 6;
  _nsRate = 0.0001;
  _maxPoint = 100;

  for (let i = 0; i < _objectNum; i++) {
    _aryObject.push(new line());
  }
  _bgColor = color(0, 0, 0);
}

function draw() {
  clear();
  // background(_bgColor);

  for (let i = 0; i < _objectNum; i++) {
    _aryObject[i].update();
    _aryObject[i].draw();
  }
}

class line {
  constructor() {
    this.nsX = random(100);
    this.nsY = random(100);
    this.color = color(random(360), 20, random(100));
    this.sw = random(width/20, width/4);
    this.aryPoints = [];
  }
  update() {
    this.nsX += _nsRate;
    this.nsY += _nsRate;
    this.aryPoints.unshift([
      width/3 * cos(8*PI*noise(this.nsX)),
      height/3 * sin(8*PI*noise(this.nsY))
    ]);
    while (this.aryPoints.length > _maxPoint) {
      this.aryPoints.pop();
    }
  }
  draw() {
    fill(this.color);
    push();
    translate(width/2, height/2);
    let ang = atan2(
                    this.aryPoints[0][1] - this.aryPoints[this.aryPoints.length-1][1], 
                    this.aryPoints[0][0] - this.aryPoints[this.aryPoints.length-1][0]
                    );
    beginShape();
    vertex(this.aryPoints[0][0] + this.sw * cos(ang + PI/2),
            this.aryPoints[0][1] + this.sw * sin(ang + PI/2));
    vertex(this.aryPoints[0][0] + this.sw * cos(ang - PI/2),
            this.aryPoints[0][1] + this.sw * sin(ang - PI/2));
    vertex(this.aryPoints[this.aryPoints.length-1][0] + this.sw * cos(ang - PI/2),
            this.aryPoints[this.aryPoints.length-1][1] + this.sw * sin(ang - PI/2));
    vertex(this.aryPoints[this.aryPoints.length-1][0] + this.sw * cos(ang + PI/2),
            this.aryPoints[this.aryPoints.length-1][1] + this.sw * sin(ang + PI/2));
    endShape(CLOSE);
    pop();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function render() {
  save("wallpaper.jpg");
}