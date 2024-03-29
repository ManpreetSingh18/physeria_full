const btn = document.getElementsByTagName('Button');
const readings = document.getElementsByClassName('reading');
var resistance = readings[0].getElementsByTagName('input');
var length = readings[1].getElementsByTagName('input');
const r = document.getElementsByClassName('r');

const form1 = document.getElementById('form1');


// declaring variables
var resistance, resistanceArr = [],
  lengthArr = [],
  x = [],
  restivity = [];

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {

  var diameter = document.getElementById("diameter");

  console.log("Diameter:" + diameter.value)


  for (let i = 0; i < resistance.length; i++) {
    resistanceArr[i] = resistance[i].value;
    lengthArr[i] = length[i].value;
  }
  console.log("Resistance" + resistanceArr)
  console.log("Length of wire:" + lengthArr)



  for (let i = 0; i < resistanceArr.length; i++) {
    x[i] = ((100 - lengthArr[i]) / lengthArr[i]) * resistanceArr[i];

  }
  console.log("X:" + x)

  //calculating resistivity



  for (let i = 0; i < resistanceArr.length; i++) {
    restivity[i] = (x[i] * 3.14 * Math.pow(diameter.value, 2)) / 4 * lengthArr[i];
  }

  console.log("Resistivity:" + restivity)



  output = document.getElementById('output');
  output.style.display = "block";
  // initializing all constants,variables and arrays

}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const readingResistance = document.createElement("input");
  const readingLength = document.createElement("input");

  readingResistance.type = "text";
  readingResistance.placeholder = "reading " + count;
  readingResistance.classList.add("reading-i");
  readingResistance.setAttribute('required', '');
  readingResistance.setAttribute('name', 'resistance');

  readingLength.type = "text";
  readingLength.placeholder = "reading " + count;
  readingLength.classList.add("reading-i");
  readingLength.setAttribute('required', '');
  readingLength.setAttribute('name', 'length');

  readings[0].appendChild(readingResistance);
  readings[1].appendChild(readingLength);
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


  //printing values
  for (var i = 0; i < r.length; i++) {
    switch (i) {
      case 0:
        r[i].innerHTML = diameter.value;
        break;
      case 1:
        r[i].innerHTML = x;
        break;
      case 2:
        r[i].innerHTML = restivity;
        break;
      default:

    }
  }

  var ctx = document.getElementById("chartId").getContext("2d");
  var newChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: restivity,
      datasets: [{
        label: "Resistivity-Length ",
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: lengthArr
      }]
    },
    options: {
      responsive: false
    }
  });
  report.style.display = "block";
}

// finding Log Error

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
