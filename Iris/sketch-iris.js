var nn;

var trainingData, testingData;

var chartData = {
  labels: null,
  datasets: []
};


function setup() {  
  nn = new NeuralNetwork(4, 3);
  nn.addHiddenLayer(8);
  nn.addHiddenLayer(6);
  nn.generateWeights(0);
  nn.setLearningRateAlpha(0.01);

  trainingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv");
  testingData = readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv");

  trainingData.then((data) => {
    var dataPointX = [];
    var dataPointY = [];
    for(let i = 0; i < 10000; i++) {
      var trainingSet = data[Math.floor(Math.random() * data.length)];
      let input = trainingSet.input;
      let output = trainingSet.output;
      
      var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
      var cost = nn.getCost(output, outputPrim);      
      nn.train(cost);

      var totalCost = cost.reduce((a, b) => a + b, 0);
      dataPointX.push(i);
      dataPointY.push(totalCost);
    }

    // Set the chart information for training data set
    chartData.labels = dataPointX;
    chartData.datasets.push(
      {
        data: dataPointY,
        label: "Training Data",
        borderColor: "#3cba9f",
        fill: false
      }
    );
  });
}

function draw() {
  
  testingData.then((data) => {
    var dataPointX = [];
    var dataPointY = [];
    var i = 0;
    data.forEach(testSet => {
      let input = testSet.input;
      let output = testSet.output;

      var outputPrim = nn.guess(JSON.parse(JSON.stringify(input)));
      var cost = nn.getCost(output, outputPrim);
      console.log(output, outputPrim);

      var totalCost = cost.reduce((a, b) => a + b, 0);
      // console.log(totalCost);
      dataPointX.push(i);
      dataPointY.push(totalCost);

      i++;

    });

    // Set the chart information for training data set
    chartData.labels = dataPointX;
    chartData.datasets.push(
      {
        data: dataPointY,
        label: "Testing Data",
        borderColor: "#c45850",
        fill: false
      }
    );
    drawChart("costChart", "Cost Function", chartData);
  });


  noLoop();
}

// Create the training chart to view cost function
function drawChart(charId, chartTitle, data) {
  // console.log(charId);
  // console.log(chartTitle);
  // console.log(data);
  // console.log(data.labels);
  // console.log(data.datasets);
  new Chart(document.getElementById(charId), {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: data.datasets
    },
    options: {
      title: {
        display: true,
        text: chartTitle
      }
    }
  });
}