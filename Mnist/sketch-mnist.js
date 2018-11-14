var nn;

var set;
var trainingSet, testingSet;
var trainingIndex, testingIndex;
var trainingLen = 8000, testingLen = 100;

var imgHeight = 28, imgWidth = 28;


function setup() {
  // createCanvas must be the first statement
  createCanvas(100, 100);

  set = mnist.set(trainingLen, testingLen);

  trainingSet = set.training;
  testingSet = set.test;

  trainingIndex = Math.round(random(trainingLen));

  var inputLen = trainingSet[trainingIndex].input.length;
  var outputLen = trainingSet[trainingIndex].output.length;


  nn = new NeuralNetwork(inputLen, outputLen);
  nn.addHiddenLayer(64);
  nn.addHiddenLayer(32);
  nn.addHiddenLayer(16);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.01);
  noLoop();
}

function draw() {
  background(0);

  for(let i = 0; i < trainingSet.length; i ++) {
    ((i) => {
      setTimeout(() => {
        var input = trainingSet[i].input;
        var output = trainingSet[i].output;
    
        // If i take out noSmooth it will make it look blurry
        noSmooth();
        // Draw the image
        image(drawDigit(input), 0, 0, width, height);
        var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
        console.log(output);
        console.log(outputPrim);
        var cost = nn.getCost(output, outputPrim);
        nn.train(cost);
      }, 25 * i);
    }) (i);
  }

	noLoop();
}

// Mouse click will be used for testing
function mousePressed() {
  trainingIndex = Math.round(random(trainingLen));
  redraw();
}

function drawDigit(input) {
  var img = createImage(imgWidth, imgHeight);
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