const btn = document.getElementsByTagName("Button");
const readings = document.getElementsByClassName("reading");
var resistance = readings[0].getElementsByTagName("input");
var length = readings[1].getElementsByTagName("input");
const r = document.getElementsByClassName("r");
var lc = document.getElementById("lc");
const form1 = document.getElementById("form1");

// declaring variables
var resistance,
  T = [],
  l = [],
  P,
  thermo = [];
//taking single values

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {
  var emf = document.getElementById("e");
  var resist_potent = document.getElementById("r_potentio");
  var Restiance_box = document.getElementById("R");
  var Length = document.getElementById("L");

  var e = Number(emf.value);
  var r_p = Number(resist_potent.value);
  var R = Number(Restiance_box.value);
  var L = Number(Length.value);

  console.log("EMF:", e);
  console.log("resistance of potentio:" + r_p);
  console.log("R: " + R);
  console.log("L: " + L);

  P = Number(e * r_p) / ((R + r_p) * L);

  console.log("P:" + P);

  for (let i = 0; i < resistance.length; i++) {
    T[i] = Number(resistance[i].value);
    l[i] = Number(length[i].value);
    thermo[i] = P * l[i];
    //console.log("AVg:"+typeof(avg))
  }

  console.log("T: " + T);
  console.log("l: " + l);
  console.log("Thermo:" + thermo);
  output = document.getElementById("output");
  output.style.display = "block";
  // initializing all constants,variables and arrays
}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const readingTemperature = document.createElement("input");
  const readingLength = document.createElement("input");

  readingTemperature.type = "text";
  readingTemperature.placeholder = "reading " + count;
  readingTemperature.classList.add("reading-i");
  readingTemperature.setAttribute("required", "");
  readingTemperature.setAttribute("name", "temperature");

  readingLength.type = "text";
  readingLength.placeholder = "reading " + count;
  readingLength.classList.add("reading-i");
  readingLength.setAttribute("required", "");
  readingLength.setAttribute("name", "length");

  readings[0].appendChild(readingTemperature);
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
        r[i].innerHTML = P;
        break;
      case 1:
        r[i].innerHTML = thermo;
        break;
      case 2:
        r[i].innerHTML = R;
        break;
      case 3:
        r[i].innerHTML = R;
        break;
      default:
    }
  }

  //Graph code
  chrt = document.getElementById("chartId").getContext("2d");

  chartId = new Chart(chrt, {
    type: "line",
    data: {
      labels: T,
      datasets: [{
        label: "temperature vs thermo emf",
        data: thermo,
        backgroundColor: [
          "yellow",
          "aqua",
          "pink",
          "lightgreen",
          "lightblue",
          "gold",
        ],
        borderColor: ["black"],
        borderWidth: 2,
        pointRadius: 5,
      }, ],
    },
    options: {
      responsive: false,
    }
  });
  report.style.display = "block";
}
//adding events on every button
btn[0].addEventListener("click", addReadingInput);
btn[1].addEventListener("click", deleteReadingInput);
btn[2].addEventListener("click", result);

//print pdf function
function printForm() {
  console.log("there");
  printJS({
    printable: "form1",
    type: "html",
    targetStyles: ["*"],
    header: "My form",
    imageStyle: "width:50%;margin-bottom:20px;",
    css: "../css/beautify.css",
  });
}
