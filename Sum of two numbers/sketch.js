function Cell(x, y, width, height, value) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.value = value;

  this.state = -1;

  this.setState = (state) => this.state = state;

  this.draw = () => {
    stroke('#FFF');
    switch (this.state) {
      case 0:
        fill('#8b0000');
        break;
      case 1:
        fill('#03a9f4');
        break;
      case 2:
        fill('#228b22');
        break;
      case 3:
        fill('#311b92');
        break;
      case 4:
        fill('#ffc400');
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

function Solution(targVal, xIdx, yIdx) {
  this.xIndex = xIdx;
  this.yIndex = yIdx;
  this.res;
  this.target = targVal;
  this.updateRes = (val) => {
    if (this.res === undefined) this.res = val;
    if(Math.abs(this.target - val.value) < Math.abs((this.target - this.res.value))) {
      this.res = val;
    }
  };
  this.setDone = () => {
    this.res.setState(0);
  }
};

let myMatrix;
let target;
let solution;

function setup() {
  createCanvas(600, 600);
  target = 100; //int(random(50, 300))
  myMatrix = new Matrix(target);
  myMatrix.orderArrays();
  myMatrix.fillCells();
}

function draw() {
  background('#212121');
  myMatrix.draw();
}

let step = 0;

function mousePressed() {
  if (solution === undefined) {
    solution = new Solution(target, myMatrix.x.length, myMatrix.y.length);
  }
  algoritmo1(step, myMatrix.cells, target);
}

function algoritmo1(i, mat, targVal) {
  if (solution.xIndex === 0 || solution.yIndex === 0) {
    solution.setDone();
    return;
  }
  const currentRow = mat[i];
  const lastVal = currentRow[solution.xIndex - 1];
  if (lastVal.value < targVal) {
    currentRow.slice(0, solution.xIndex - 1).forEach(c => c.setState(2));
    lastVal.setState(3);
    if (solution.yIndex > 0) solution.yIndex -= 1;
    else solution.setDone();
    step++;
  } else if (lastVal.value > targVal) {
    mat.slice(mat.length - solution.yIndex + 1, mat.length)
      .forEach(row => {
        const lastCell = row[solution.xIndex - 1];
        lastCell.setState(1);
      });
    lastVal.setState(4);
    if (solution.xIndex > 0) solution.xIndex -= 1;
    else solution.setDone();
  } else { // They are equal
    lastVal.setState(0);
  }
  solution.updateRes(lastVal);
  console.log(solution)
}