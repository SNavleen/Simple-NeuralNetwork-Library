const species = (output) => {
  if(output[0] == 1) {
    return "setosa";
  } else if(output[1] == 1) {
    return "versicolor";
  } else if(output[2] == 1) {
    return "virginica";
  }
  return null;
}

const speciesToArr = (species) => {
  if(species === "setosa") {
    return [1, 0, 0];
  } else if(species === "versicolor") {
    return [0, 1, 0];
  } else if(species === "virginica") {
    return [0, 0, 1];
  }
  return null;
}

const readIrisData = (csvFile) => {
  var csvData = d3.csv(csvFile);
  var irisData = csvData.then(createDataObj);
  return irisData;
}

function createDataObj(data) {
  var dataObj = [];
  data.forEach(element => {
    var input = [element.sepal_length, element.sepal_width, element.petal_length, element.petal_width];
    var output = speciesToArr(element.species);
    // 
    dataObj.push({input: input, output: output});
  });
  
  return new Promise(resolve => resolve(dataObj));
}

// Basic d3js usage
// d3.csv("http://localhost/~Nav/MachineLearning/NodeJs/Github/Simple-NeuralNetwork-Library/Iris/data/iris-test.csv", function(data) {
//   console.log(data);
// });

// How to get testing and train data for iris specific
// console.log(readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-test.csv"));
// console.log(readIrisData("https://raw.githubusercontent.com/SNavleen/Simple-NeuralNetwork-Library/iris/Iris/data/iris-train.csv"));