var nn;

var trainingData;
var testingData;


function setup() {  
  nn = new NeuralNetwork(4, 3);
  nn.addHiddenLayer(6);
  nn.addHiddenLayer(3);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.01);

  trainingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv");
  testingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv");

  // Create the training chart to view cost function
  var dataPoints = [];
  for(let i = 0; i < 1000; i++) {
    trainingData.then((data) => {
      var trainingSet = data[Math.floor(Math.random() * data.length)];
      let input = trainingSet.input;
      let output = trainingSet.output;
      
      var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
      var cost = nn.getCost(output, outputPrim);      
      nn.train(cost);

      var totalCost = cost.reduce((a, b) => a + b, 0);
      dataPoints.push({
        x: i,
        y: totalCost
      });

    });
  }

  // drawChart("trainingChart", "Training char: Cost function", dataPoints);
  new Chart(document.getElementById("trainingChart"), {
    type: 'line',
    data: {
      datasets: [
        { 
          data: dataPoints,
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });
}

function draw() {
  // var dataPoints = [];
  // testingData.then((data) => {
  //   var i = 0;
  //   data.forEach(testSet => {
  //     let input = testSet.input;
  //     let output = testSet.output;

  //     var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
  //     var cost = nn.getCost(output, outputPrim);

  //     var totalCost = cost.reduce((a, b) => a + b, 0);
  //     // console.log(totalCost);
  //     dataPoints.push({
  //       x: i,
  //       y: totalCost
  //     });

  //     i++;
  //   });

  // });

  // drawChart("testChart", "Testing char: Cost function", dataPoints);
  noLoop();
}

// function drawChart(charId, charTitle, dataPoints) {
//   var data = [
//     {
//       type: "line",
//       dataPoints: dataPoints
//     }
//   ];
//   var chart = new CanvasJS.Chart(charId, {
//     animationEnabled: true,
//     // zoomEnabled: true,
//     title:{
//       text: charTitle
//     },
//     axisY :{
//       includeZero: true
//     },
//     data: data  // random generator below
//   });
//   chart.render();
// }