const btn = document.getElementsByTagName('Button');
const readings = document.getElementsByClassName('reading');
var voltage = readings[0].getElementsByTagName('input');
const r = document.getElementsByClassName('r');

const form1 = document.getElementById('form1');


// declaring variables
var resistance, currentArr = [],
  voltageArray = [];

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {
  // fetching user inputs
  resistance = document.getElementById('resistance').value;
  console.log("Resistance", resistance)


  console.log(voltage.length)
  for (let i = 0; i < voltage.length; i++) {
    voltageArray[i] = voltage[i].value
  }

  console.log("Voltage array:" + voltageArray)


  for (let i = 0; i < voltageArray.length; i++) {
    currentArr[i] = (voltageArray[i]) / resistance;
  }
  console.log("Current(I) Array:", currentArr)



  output = document.getElementById('output');
  output.style.display = "block";
  // initializing all constants,variables and arrays

}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const reading = document.createElement("input");
  reading.type = "text";
  reading.placeholder = "reading " + count;
  reading.classList.add("reading-i");
  reading.setAttribute('required', '');
  reading.setAttribute('name', 'voltage');
  readings[0].appendChild(reading);
  // readings[1].appendChild(reading);
  count++;
}

// remove dynamic input boxes on clicking - button
function deleteReadingInput() {
  removeInputVol = readings[0].lastElementChild;
  // removeInputTemp = readings[1].lastElementChild;
  readings[0].removeChild(removeInputVol);
  // readings[1].removeChild(removeInputTemp);
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
        r[i].innerHTML = resistance;
        break;
      case 1:
        r[i].innerHTML = voltageArray;
        break;
      case 2:
        r[i].innerHTML = currentArr;
        break;
      default:

    }
  }

  var ctx = document.getElementById("chartId").getContext("2d");
  var newChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: voltageArray,
      datasets: [{
        label: "Voltage-Current ",
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: currentArr
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
