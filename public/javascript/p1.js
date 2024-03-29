const btn = document.getElementsByTagName('Button');
const readings = document.getElementsByClassName('reading');
const voltageArray = readings[0].getElementsByTagName('input');
const temperatureArray = readings[1].getElementsByTagName('input');
const r = document.getElementsByClassName('r');
const form1 = document.getElementById('form1');

// declaring variables
var count, convertedTemperature, convertedTemperature, slope, logError, sumX, sumY, sumXY, sumXX, I, s,
  leastCountOfTherm, pie, f, D, K, removeInputTemp, removeInputVol, output, chrt, chartId, n;

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {
  // fetching user inputs
  I = document.getElementById('I').value;
  s = document.getElementById('s').value;
  t = document.getElementById('t').value
  leastCountOfTherm = document.getElementById('leastCountOfTherm').value;

  // initializing all constants,variables and arrays
  convertedTemperature = [];
  convertedVoltage = [];
  slope = 0;
  sumX = 0;
  sumY = 0;
  sumXY = 0;
  sumXX = 0;
  logError = 0;
  pie = 3.14;
  f = ((2 * s) / t) * 0.69314;
  D = (2 * pie * s) / (f * 10);
  K = 8.625 * Math.pow(10, -5);
}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const readingVol = document.createElement("input");
  const readingTemp = document.createElement("input");
  readingVol.type = "text";
  readingVol.placeholder = "reading " + count;
  readingVol.classList.add("reading-i");
  readingVol.setAttribute('name', 'voltage');
  readingVol.setAttribute('required', '');

  readingTemp.type = "text";
  readingTemp.placeholder = "reading " + count;
  readingTemp.classList.add("reading-i");
  readingTemp.setAttribute('name', 'temperature');
  readingVol.setAttribute('required', '');
  readings[0].appendChild(readingVol);
  readings[1].appendChild(readingTemp);
  count++;
}

// remove dynamic input boxes on clicking - button
function deleteReadingInput() {
  removeInputVol = readings[0].lastElementChild;
  removeInputTemp = readings[1].lastElementChild;
  readings[0].removeChild(removeInputVol);
  readings[1].removeChild(removeInputTemp);
  count--;
}

//result function will show final result with graph
function result() {
  // calling intialize function to intialize all variavles arrays and constants
  intialize();
  if (temperatureArray.length !== voltageArray.length) {
    return "The length of the two arrays must be equal.";
  } else {
    for (let i = 0; i < voltageArray.length; i++) {
      convertedVoltage[i] = Math.log10(((voltageArray[i].value) / I) * D);
      convertedTemperature[i] = 1000 / ((temperatureArray[i].value) + 273);
    }
  }
  let slope = findSlope(convertedTemperature, convertedVoltage);
  let Eg = 2 * 2.303 * K * 1000 * slope;
  let Eg_standard = 0.67;
  let logError = checkLogError(convertedTemperature, convertedVoltage, Eg);
  console.log(logError);
  let error = (Eg_standard - Eg) * 100 / Eg_standard;

  output = document.getElementById('output');
  output.style.display = "block";


  for (var i = 0; i < r.length; i++) {
    switch (i) {
      case 0:
        r[i].innerHTML = slope;
        break;
      case 1:
        r[i].innerHTML = Eg;
        break;
      case 2:
        r[i].innerHTML = Eg_standard;
        break;
      case 3:
        r[i].innerHTML = error;
        break;
      case 4:
        r[i].innerHTML = logError;
        break;
      default:

    }
  }
  //Graph code Starts

  chrt = document.getElementById("chartId").getContext("2d");

  chartId = new Chart(chrt, {
    type: 'line',
    data: {
      labels: convertedTemperature,
      datasets: [{
        label: "Graph",
        data: convertedVoltage,
        backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold'],
        borderColor: ['black'],
        borderWidth: 2,
        pointRadius: 5,
      }],
    },
    options: {
      responsive: false
    }
  });
  report.style.display = "block";
  //Graph code Ends
}

// finding slope
function findSlope(convertedTemperature, convertedVoltage) {
  if (convertedTemperature.length !== convertedVoltage.length) {
    return "The length of the two arrays must be equal.";
  }
  n = convertedTemperature.length;
  for (let i = 0; i < n; i++) {
    sumX += convertedTemperature[i];
    sumY += convertedVoltage[i];
    sumXY += convertedTemperature[i] * convertedVoltage[i];
    sumXX += convertedTemperature[i] * convertedTemperature[i];
  }
  slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  return slope;
}

// finding Log Error
function checkLogError(convertedTemperature, convertedVoltage, Eg) {
  console.log(convertedTemperature[1], convertedTemperature[0]);
  logError = ((convertedTemperature[1] - convertedTemperature[0]) / (convertedTemperature[convertedTemperature.length - 1] - convertedTemperature[0]) + (convertedVoltage[1] - convertedVoltage[0]) / (convertedVoltage[convertedVoltage.length - 1] - convertedVoltage[0])) * Eg;
  return logError;
}

//adding events on every button
btn[0].addEventListener("click", addReadingInput);
btn[1].addEventListener("click", deleteReadingInput);
btn[2].addEventListener("click", result);

//print pdf function
function printForm() {
  console.log("there")
  printJS({
    printable: 'form1',
    type: 'html',
    targetStyles: ['*'],
    header: 'My form',
    imageStyle: 'width:50%;margin-bottom:20px;',
    css: '../css/beautify.css'
  })
}
