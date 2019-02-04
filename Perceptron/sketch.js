// Activation function
function sign(n) {
  if(n >= 0) return 1;
  return -1;
}

class Perceptron {
  constructor() {
    this.weights = new Array(2).fill(undefined).map(() => random(-1, 1));
    this.learningRate = 0.1;
  };

  guess(inputs) {
    let sum = 0;
    this.weights.forEach((w, i) => {
      sum += w * inputs[i];
    });
    return sign(sum);
  }

  train(inputs, target) {
    const guess = this.guess(inputs);
    const error = target - guess;
    // Tune all the weights
    this.weights = this.weights.map((w, i) => {
      return w + (error * inputs[i] * this.learningRate);
    })
  }
}

class Point {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.label = this.x > this.y ? 1 : -1;
  };

  show() {
    stroke(0);
    if (this.label === 1) fill(255);
    else fill(0);
    ellipse(this.x, this.y, 8, 8);
  }
}

let per;
let points = new Array(100).fill(0);
let trainingIndex = 0;

function setup() {
  createCanvas(600, 600);
  points = points.map(() => new Point());
  per = new Perceptron();
  const inputs = [-1, 0.5];
}

function draw() {
  background(255);
  stroke(0);
  line(0, 0, width, height);
  points.forEach(p => {
    p.show();
    const guess = per.guess([p.x, p.y]);
    if (guess === p.label) fill(0, 255, 0);
    else fill(255, 0, 0);
    noStroke();
    ellipse(p.x, p.y, 4, 4);
  });
  const pointTraining = points[trainingIndex];
  per.train([pointTraining.x, pointTraining.y], pointTraining.label);
  trainingIndex++;
  if (trainingIndex === points.length) trainingIndex = 0;
}

function mousePressed() {
  /*
  points.forEach(p => {
    per.train([p.x, p.y], p.label);
  });
  */
}