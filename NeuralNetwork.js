// Import the libraries
var linAlg = linearAlgebra();

// Define the vector and matrix variables
var Vector = linAlg.Vector;
var Matrix = linAlg.Matrix;

// Private functions

function rand(lo, hi){
  return Math.random() * (hi - lo) + lo;
}

function toMatrix(array){
  return new Matrix(array);
}

function toArray(matrix){
  return matrix.toArray();
}


// Activation class
class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);


class NeuralNetwork{
  constructor(sizeOfX, sizeOfY){

    // Define the global variables
    this.sizeOfX = sizeOfX;
    this.sizeOfY = sizeOfY;
    
    this.numOfLayers = 2;
    this.listOfLayers = [this.sizeOfX, this.sizeOfY];

    this.weights;
    this.outputOfAllLayers;

    // Move this into something like the activation function
    this.costFunc = (y, yPrime) => {
      // return (Math.pow(y - yPrime, 2)) / 2;
      return 2 * (y - yPrime);
    }

    this.setActivationFunction();
  }

  addHiddenLayer(numOfNodes){
    this.listOfLayers.pop()
    this.listOfLayers.push(numOfNodes);
    this.listOfLayers.push(this.sizeOfY);
    this.numOfLayers ++;
  }

  generateWeights(seedValue, lo = -1, hi = 1){
    // Set the seed
    Math.seedrandom(seedValue);

    // Define the weights array with the number of layers
    var weights = new Array(this.numOfLayers);
    for(let l = 0; l < this.numOfLayers - 1; l++){

      // Add 1 to the size of the array for the bais
      weights[l] = new Array(this.listOfLayers[l] + 1);
      for(let r = 0; r < this.listOfLayers[l] + 1; r++){

        weights[l][r] = new Array(this.listOfLayers[l+1]);
        for(let c = 0; c < this.listOfLayers[l+1]; c++){

          // Set the value to a random number between lo and hi
          weights[l][r][c] = rand(lo, hi);
          // console.log(rand(lo, hi));
        }
      }
    }
    this.weights = weights;
    // console.log(this.weights);
  }

  // Setters
  setLearningRateAlpha(learningRateAlpha){
    this.learningRateAlpha = learningRateAlpha;
  }

  setActivationFunction(func = sigmoid){
    this.activationFunc = func;
  }

  // setCostFunction(func){
  //   this.costFunc = func;
  // }

  // setWeights(weights){
  //   if(weights){
  //     process.exit(1);
  //   }
  //   this.weights = weights;
  // }


  // Getters
  getWeights(){
    return this.weights;
  }

  getCost(output, outputPrime){
    // console.log("Expected: ", output);
    // console.log("Guess: ", outputPrime);
    var cost = new Array(this.sizeOfY);
    for(let c = 0; c < this.sizeOfY; c++){
      cost[c] = this.costFunc(output[c], outputPrime[c]);
    }
    return cost;
  }


  // Prediction
  guess(input){
    var A = new Array(this.numOfLayers);
    A[0] = input;
    for(let l = 0; l < this.numOfLayers - 1; l++){

      var a = A[l];
      // console.log("a: ", a)
      a.unshift(1);
      var X = toMatrix(a);
      // console.log("X: ", X);
      var W = toMatrix(this.weights[l]);
      // console.log("W: ", W);

      var Z = X.dot(W);
      // console.log("Z: ", Z);
      A[l+1] = toArray(Z.map(this.activationFunc.func))[0];
    }
    // console.log("A: ", A);

    this.outputOfAllLayers = A;
    // console.log(this.outputOfAllLayers);
    return A[this.numOfLayers - 1];
  }

  // Training
  train(cost){
    var error = toMatrix(cost);
    
    for(let l = this.numOfLayers - 1; l > 0; l--){

      if (l !=  this.numOfLayers - 1){
        error = error.dot(newWeights.trans());
      }
      // console.log("Cost: ", error);

      var input = toMatrix(this.outputOfAllLayers[l - 1]).trans();
      // console.log("Input: ", input);
      var output = toMatrix(this.outputOfAllLayers[l]);
      // console.log("Output: ", output);

      var gradient = output.map(this.activationFunc.dfunc);
      gradient = gradient.mul(error);
      gradient = gradient.mulEach(this.learningRateAlpha);
      // console.log("Gradient: ", gradient);
      
      var weightsDelta = input.dot(gradient);
      // Take out the bais delta weights since it is not connected to any thing in the previous layer
      if (l !=  this.numOfLayers - 1){
        weightsDelta = toArray(weightsDelta);
        for(let r = 0; r < weightsDelta.length; r++){
          weightsDelta[r].shift();
        }
        weightsDelta = toMatrix(weightsDelta);
      }
      // console.log("Delta Weights: ", weightsDelta);

      var oldWeights = toMatrix(this.weights[l - 1]);
      // console.log("Old Weights: ", oldWeights);
      var newWeights = oldWeights.plus(weightsDelta);
      // console.log("New Weights: ", newWeights);
      this.weights[l-1] = toArray(newWeights);
      if (l !=  this.numOfLayers - 1){
        error = toArray(error);
        // console.log("Cost: ", error);
        error[0].shift();
        // console.log("Cost: ", error);
        error = toMatrix(error);
      }
    }
    // console.log("All Weights: ", this.weights);
  }
}