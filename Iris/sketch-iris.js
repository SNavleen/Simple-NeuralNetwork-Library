var nn;

// var csvTestingData

var trainingData;
var testingData;

function setup(){
  // // createCanvas must be the first statement
  // createCanvas(400, 400);
  
  nn = new NeuralNetwork(4, 3);
  nn.addHiddenLayer(3);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.3);

  
  // d3.csv("http://localhost/~Nav/MachineLearning/NodeJs/Github/Simple-NeuralNetwork-Library/Iris/data/iris-test.csv", function(data) {
  //   console.log(data);
  // });

  var csvTrainingData = d3.csv("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv");
  
  trainingData = csvTrainingData.then(    
    function(data) {
      var trainingObj = [];
      data.forEach(element => {
        var input = [element.sepal_length, element.sepal_width, element.petal_length, element.petal_width];
        var output;
        if(element.species === "setosa") {
          output = [1, 0, 0];
        } else if(element.species === "versicolor") {
          output = [0, 1, 0];
        } else if(element.species === "virginica") {
          output = [0, 0, 1];
        }
        trainingObj.push({input: input, output: output});
      });
      
      return new Promise(resolve => resolve(trainingObj));
    }
  );
  var csvTestingData = d3.csv("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv");
  
  testingData = csvTestingData.then(    
    function(data) {
      var testingObj = [];
      data.forEach(element => {
        var input = [element.sepal_length, element.sepal_width, element.petal_length, element.petal_width];
        var output;
        if(element.species === "setosa") {
          output = [1, 0, 0];
        } else if(element.species === "versicolor") {
          output = [0, 1, 0];
        } else if(element.species === "virginica") {
          output = [0, 0, 1];
        }
        testingObj.push({input: input, output: output});
      });
      
      return new Promise(resolve => resolve(testingObj));
    }
  );
  
}

function draw(){
  testingData.then(
    function(data) {
      console.log(data);
    }
  );
  trainingData.then(
    function(data) {
      console.log(data);
    }
  );
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