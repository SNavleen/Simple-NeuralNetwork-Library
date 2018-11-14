var nn;

var set;
var trainingSet, testingSet;
var trainingIndex, testingIndex;

const N = 2;
const trainingLen = 10000, testingLen = 100;
const imgHeight = 28, imgWidth = 28;


const basicView = () =>{
  // Draw the center line
  strokeWeight(2);
  stroke(255);
  line(width / 2, 0, width / 2, height);
  
  // Display text in both halfs of the canvas for input and guess
  textSize(32);
  textAlign(CENTER);
  fill(color(255, 0, 0));
  text("INPUT", width / 4, 32);
  text("GUESS", width / 1.3, 32);
}

function setup() {
  // createCanvas must be the first statement
  createCanvas(600, 300);

  set = mnist.set(trainingLen, testingLen);

  trainingSet = set.training;
  testingSet = set.test;

  trainingIndex = Math.round(random(trainingLen));

  var inputLen = trainingSet[trainingIndex].input.length;
  var outputLen = trainingSet[trainingIndex].output.length;


  nn = new NeuralNetwork(inputLen, outputLen);
  // nn.addHiddenLayer(64);
  nn.addHiddenLayer(32);
  nn.addHiddenLayer(16);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.03);

  // Go through the training set N times
  for(let j = 0; j < N; j ++){
    // Train the neural network by going throught the training set
    for(let i = 0; i < trainingSet.length; i ++) {
      ((i) => {
        setTimeout(() => {
          background(0);
          var input = trainingSet[i].input;
          var output = trainingSet[i].output;
      
          // Run the neural network
          var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
          var cost = nn.getCost(output, outputPrim);
          nn.train(cost);

          // Draw the image
          var img = getDigitImg(input);
          image(img, 0, height / 3, width / 2, height / 1.5);

          // Draw the guess text
          textSize(height / 2);
          textAlign(CENTER);
          fill(color(255, 0, 0));
          text(indexOfMax(outputPrim).toString(), width / 1.3, height / 1.25);

          basicView();
        }, 25 * i);
      }) (i);
    }
  }

  noLoop();
}

function draw() {
  background(0);

	noLoop();
}

// Mouse click will be used for testing
function mousePressed() {
  redraw();

  testingIndex = Math.round(random(testingLen));

  var input = testingSet[testingIndex].input;
  var output = testingSet[testingIndex].output;

  // Run the neural network
  var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
  var cost = nn.getCost(output, outputPrim);
  nn.train(cost);

  // Draw the input image
  // noSmooth();
  var img = getDigitImg(input);
  image(img, 0, height / 3, width / 2, height / 1.5);

  // Draw the guess text
  textSize(height / 2);
  textAlign(CENTER);
  fill(color(255, 0, 0));
  var outputValue = indexOfMax(outputPrim);
  text(outputValue.toString(), width / 1.3, height / 1.25);
  console.log("Confidence is: " + Math.round(outputPrim[outputValue] * 100) + "%");

  basicView();
}

function getDigitImg(input) {
  var img = createImage(28, 28);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Set the new pixel value
      var index = y * imgWidth + x;
      var value = input[index];
      var newColor = value * 255;
      img.set(x, y, newColor);
    }
  }
  img.updatePixels();
  return img;
}

function indexOfMax(arr) {
  if(arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for(var i = 1; i < arr.length; i++) {
    if(arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}