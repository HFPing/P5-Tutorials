class Star {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width);
    this.pz = this.z;
  };

  update () {
    this.z -= speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width / 2, width / 2);
      this.y = random(-height / 2, height / 2);
      this.pz = this.z;
    }
  };

  show () {
    fill(255);
    noStroke();
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);
    const r = map(this.z, 0, width, 16, 0);
    // ellipse(sx, sy, r, r);
    stroke(255);
    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);
    line(px, py, sx, sy);
    this.pz = this.z;
  };
}

const stars = [];
let speed;

function setup() {
  createCanvas(600, 600);
  for(let i = 0; i < 200 ; i++) {
    stars.push(new Star());
  }
}

function draw() {
  speed = map(mouseX, 0, width, 0, 50);
  background(0);
  translate(width / 2, height / 2);
  stars.forEach(st => {
    st.update();
    st.show();
  });
}