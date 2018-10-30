let nn;
let normalize;

function randomColor(){
  red = random(255);
  green = random(255);
  blue = random(255);
  // return {r: red, g: green, b: blue};
}

function mousePressed(){

  let guess = prediction(red, green, blue);

  if(mouseX >  0 && mouseX < width / 2){
    // White (aka 1)
    // Get cost
    var cost = nn.getCost(1, guess);

    // Train
    nn.train(cost);

    // New example
    randomColor();
    redraw();
  }else if(mouseX >  width / 2 && mouseX < width){
    // White (aka 1)
    // Get cost
    var cost = nn.getCost(0, guess);

    // Train
    nn.train(cost);

    // New example
    randomColor();
    redraw();
  }
}

function prediction(r, g, b){
  // Normalize each value
  normalize = new Normalization();
  let red = normalize.minMaxNorm(r, 0, 255);
  let green = normalize.minMaxNorm(g, 0, 255);
  let blue = normalize.minMaxNorm(b, 0, 255);

  let input = [red, green, blue];
  // console.log(input);
  let output = nn.guess(JSON.parse(JSON.stringify(input)));

  // return output;
  return Math.round(output[0]);
}

function setup(){
  // createCanvas must be the first statement
  createCanvas(500, 500);
  noLoop();

  nn = new NeuralNetwork(3, 1);
  nn.addHiddenLayer(3);
  nn.addHiddenLayer(2);
  nn.setLearningRateAlpha(0.1);
  nn.generateWeights(0);

  randomColor();
}

function draw(){
  background(0);

  strokeWeight(4);
  stroke(255);
  line(width / 2, 0, width / 2, height);

  noStroke();

  let circleWidth = width / 3;
  let circleHeight = height / 3;
  let cirlceX = width / 10 + circleWidth / 2;
  let circleY = height / 2;

  fill(red, green, blue);
  ellipse(cirlceX, circleY, circleWidth, circleHeight);
  ellipse(width - cirlceX, circleY, circleWidth, circleHeight);

  textSize(32);
  textAlign(CENTER);
  fill(255);
  text("WHITE", cirlceX, circleY);
  fill(0);
  text("BLACK", width - cirlceX, circleY);

  let guess = prediction(red, green, blue);
  console.log(guess);
  fill(255);
  if(guess == 1){
    ellipse(cirlceX, circleY / 2, circleWidth / 5, circleHeight / 5);
  }else{
    ellipse(width - cirlceX, circleY / 2, circleWidth / 5, circleHeight / 5);
  }
}