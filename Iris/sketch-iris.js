var nn;

var trainingData;
var testingData;

var currentTrainingSet = 0;

function setup() {
  // createCanvas must be the first statement
  createCanvas(1300, 400);
  
  nn = new NeuralNetwork(4, 3);
  nn.addHiddenLayer(3);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.3);

  trainingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv");
  testingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv");
}

function draw() {
  // background(0);

  // Set the seed
  Math.seedrandom();
  trainingData.then((data) => {
    var trainingSet = data[Math.floor(Math.random() * data.length)];
    // console.log(trainingSet);
    let input = trainingSet.input;
    let output = trainingSet.output;
    
    var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
    var cost = nn.getCost(output, outputPrim);      
    nn.train(cost);

    var totalCost = cost.reduce((a, b) => a + b, 0);
    // console.log((width / 2) + (totalCost * 20));
    
    fill(255);
    ellipse(currentTrainingSet, (height / 2) + (totalCost * 50), 10, 10);
  });

  

  // let resolution = 10;
  // let col = width / resolution;
  // let row = height / resolution;

  // for(i = 0; i < col; i++){
  //   for(j = 0; j < row; j++){
  //     let x = [i / col, j / row];
  //     let y = nn.guess(JSON.parse(JSON.stringify(x)));
  //     noStroke();
  //     fill(y[0] * 255);
  //     rect(i*resolution, j*resolution, resolution, resolution);
  //   }
  // }

  // testingData.then((data) => console.log(data));
  currentTrainingSet ++;
  if(currentTrainingSet == 1000) {
    noLoop();
  }
}