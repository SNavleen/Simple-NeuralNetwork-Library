var nn;

var set;
var trainingSet, testingSet;
var trainingIndex, testingIndex;
var trainingLen = 200, testingLen = 100;

var img;
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

  

  // nn = new NeuralNetwork(inputLen, outputLen);
  // nn.addHiddenLayer(16);
  // nn.addHiddenLayer(16);
  // nn.addHiddenLayer(16);
  // nn.generateWeights(0);
  // nn.setLearningRateAlpha(0.1);
  noLoop();
}

function draw() {
  background(0);

  var input = trainingSet[trainingIndex].input;
  var output = trainingSet[trainingIndex].output;

  img = createImage(imgWidth, imgHeight);
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

  // If i take out noSmooth it will make it look blurry
  noSmooth();
  
  // Draw the image
	image(img, 0, 0, width, height);

	noLoop();
}

function mousePressed() {
  trainingIndex = Math.round(random(trainingLen));
  redraw();
}