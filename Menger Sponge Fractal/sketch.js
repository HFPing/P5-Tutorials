class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r; 
  };

  show() {
    push();
    translate(this.pos);
    box(this.r);
    pop();
  }

  generate() {
    const boxes = [];
    for(let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          const sum = abs(x) + abs(y) + abs(z);
          if(sum > 1) {
            const newR = this.r / 3;
            const nb = new Box(
              x * newR + this.pos.x,
              y * newR + this.pos.y,
              z * newR + this.pos.z,
              newR
            );
            boxes.push(nb);
          }
        }
      }
    }
    return boxes;
  }
}

let b;
let sponge = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function mousePressed() {
  // sponge = sponge[0].generate();
  let next = [];
  sponge.forEach(e => {
    const newBoxes = e.generate();
    next = [...next, ...newBoxes];
  });
  sponge = next;
}

let a = 0;

function draw() {
  background(0);
  pointLight(250, 250, 250, 0, 0, 0);
  //stroke(0);
  noStroke();
  ambientLight(150);
  ambientMaterial(250);
  rotateX(a);
  rotateY(a * 0.4);
  sponge.forEach(e => {
    e.show();
  });
  a += 0.01;
}