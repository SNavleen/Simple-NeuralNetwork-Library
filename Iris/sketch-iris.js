var nn;

var trainingData;
var testingData;

function setup(){
  // // createCanvas must be the first statement
  // createCanvas(400, 400);
  
  nn = new NeuralNetwork(4, 3);
  nn.addHiddenLayer(3);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.3);

  trainingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv");
  testingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv");
}

function draw(){
  testingData.then((data) => console.log(data));
  noLoop();
  // background(0);

  // // Using batch sizes TODO: figuer out how batch size works with total cost and update the cost function
  // var totalCost = [0, 0];
  // let n = 10
  // for(let k = 0; k < n; k++){
  //   var data = random(trainingData);
  //   let input = data.input;
  //   let output = data.output;
    
  //   var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
  //   var cost = nn.getCost(output, outputPrim);
  //   // totalCost[0] = totalCost[0] + cost[0];
  //   // totalCost[1] = totalCost[1] + cost[1];
  //   // console.log(totalCost);
  // }
  // // totalCost[0] = totalCost[0]/n;
  // // totalCost[1] = totalCost[1]/n;
  // nn.train(cost);

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
}