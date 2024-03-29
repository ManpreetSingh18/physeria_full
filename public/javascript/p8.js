const btn = document.getElementsByTagName("Button");
const readings = document.getElementsByClassName("reading");
var resistance = readings[0].getElementsByTagName("input");
var length = readings[1].getElementsByTagName("input");
const r = document.getElementsByClassName("r");
var lc = document.getElementById("lc");
const form1 = document.getElementById("form1");

// declaring variables
var resistance,
  M = [],
  N = [],
  thickness = [],
  avg = 0;

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {
  for (let i = 0; i < resistance.length; i++) {

    M[i] = Number(resistance[i].value);
    N[i] = Number(length[i].value);
    thickness[i] = (M[i] + N[i] * Number(lc.value));
    avg += (thickness[i]);
    //console.log("AVg:"+typeof(avg))
  }

  avg = (avg / M.length).toFixed(4);
  console.log("M: " + M);
  console.log("N: " + N);
  console.log("LC:" + lc.value)
  console.log("thickness:" + thickness);
  console.log("Average/Mean: " + avg)
  output = document.getElementById("output");
  output.style.display = "block";
  // initializing all constants,variables and arrays
}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const readingLinear = document.createElement("input");
  const readingCircular = document.createElement("input");

  readingLinear.type = "text";
  readingLinear.placeholder = "reading " + count;
  readingLinear.classList.add("reading-i");
  readingLinear.setAttribute("required", "");
  readingLinear.setAttribute("name", "linearscale");

  readingCircular.type = "text";
  readingCircular.placeholder = "reading " + count;
  readingCircular.classList.add("reading-i");
  readingCircular.setAttribute("required", "");
  readingCircular.setAttribute("name", "circularscale");

  readings[0].appendChild(readingLinear);
  readings[1].appendChild(readingCircular);
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
        r[i].innerHTML = M;
        break;
      case 1:
        r[i].innerHTML = N;
        break;
      case 2:
        r[i].innerHTML = thickness;
        break;
      case 3:
        r[i].innerHTML = avg;
        break;
      default:
    }
  }
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
