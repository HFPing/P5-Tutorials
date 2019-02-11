function Cell(x, y, width, height, value) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.value = value;

  this.state = undefined;

  this.setState = (state) => this.state = state;

  this.draw = () => {
    stroke('#FFF');
    switch (this.state) {
      case true:
        fill('#228b22');
        break;
      case false:
        fill('#8b0000');
        break;
      default:
        fill('#696969');
        break;
    }
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER, CENTER);
    noStroke();
    fill('white');
    text(this.value, this.x + this.width / 2, this.y + this.height / 2);
  };
}

function Matrix(target) {
  this.offX = 50;
  this.offY = 50;
  this.width = 500;
  this.height = 500;

  this.x = new Array(int(random(5, 20)))
  .fill(0)
  .map(() => int(random(1, 100)));
  this.y = new Array(int(random(5, 20)))
  .fill(0)
  .map(() => int(random(1, 100)));

  this.orderArrays = () => {
    this.x.sort((a, b) => a - b);
    this.y.sort((a, b) => a - b);
  };

  this.spacingX = this.width / this.x.length;
  this.spacingY = this.height / this.y.length;

  this.cells = [];

  this.fillCells = () => {
    this.cells = [];
    this.y.forEach((yVal, yIdx) => {
      const y = yIdx * this.spacingY;
      const row = [];
      this.x.forEach((xVal, xIdx) => {
        const x = xIdx * this.spacingX;
        row.push(new Cell(x, y, this.spacingX, this.spacingY, xVal + yVal));
      });
      this.cells.push(row);
    });
  }

  this.fillCells();

  this.draw = () => {
    translate(this.offX, this.offY);
    this.cells.forEach(row => row.forEach(c => c.draw()));
    textAlign(CENTER, CENTER);
    this.x.forEach((num, idx) => {
      const x = idx * this.spacingX;
      fill(0, 255, 0);
      noStroke();
      text('X' + idx, x + this.spacingX / 2, - 30);
      fill(255);
      text(num, x + this.spacingX / 2, - 10);
    });
    this.y.forEach((num, idx) => {
      const y = idx * this.spacingY;
      fill(0, 0, 255);
      noStroke();
      text('Y' + idx, - 30, y + this.spacingY / 2);
      fill(255);
      text(num, - 10, y + this.spacingY / 2);
    });
    fill(255, 0, 0);
    text('Target: ' + target, this.width / 2, this.height + 20);
  }
}

let myMatrix;
let target;

function setup() {
  createCanvas(600, 600);
  target = 100; //int(random(50, 300))
  myMatrix = new Matrix(target);
  myMatrix.orderArrays();
  myMatrix.fillCells();
  console.log(myMatrix);
}

function draw() {
  background('#212121');
  myMatrix.draw();
}

let step = 0;

function mousePressed() {
  algoritmo1(step, myMatrix.cells, target);
}
// Implement algorithm
function algoritmo1(i, mat, val) {
  const currentRow = mat[i];
  console.log(currentRow);
}