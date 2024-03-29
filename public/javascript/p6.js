const btn = document.getElementsByTagName("Button");
const readings = document.getElementsByClassName("reading");
var resistance = readings[0].getElementsByTagName("input");
var length = readings[1].getElementsByTagName("input");
const r = document.getElementsByClassName("r");
const form1 = document.getElementById("form1");

// declaring variables
var resistance,
  L1Arr = [],
  L2Arr = [],
  L1andL2 = [],
  avg = 0;

//global variable
count = 3;

// intialize function to declare all variables and arrays
function intialize() {
  for (let i = 0; i < resistance.length; i++) {
    L1Arr[i] = resistance[i].value;
    L2Arr[i] = length[i].value;
    L1andL2[i] = (L1Arr[i] / L2Arr[i]).toFixed(4);
    avg += Number(L1andL2[i]);
  }
  avg = (avg / resistance.length).toFixed(4);
  console.log("L1: " + L1Arr);
  console.log("L2: " + L2Arr);
  console.log("L1/L2:" + L1andL2);
  console.log("Average: " + avg)
  output = document.getElementById("output");
  output.style.display = "block";
  // initializing all constants,variables and arrays
}

// add dynamic input boxes on clicking + button for taking more readings
function addReadingInput() {
  const readingL1 = document.createElement("input");
  const readingL2 = document.createElement("input");

  readingL1.type = "text";
  readingL1.placeholder = "reading " + count;
  readingL1.classList.add("reading-i");
  readingL1.setAttribute("required", "");
  readingL1.setAttribute("name", "l1");

  readingL2.type = "text";
  readingL2.placeholder = "reading " + count;
  readingL2.classList.add("reading-i");
  readingL2.setAttribute("required", "");
  readingL2.setAttribute("name", "l2");

  readings[0].appendChild(readingL1);
  readings[1].appendChild(readingL2);
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
        r[i].innerHTML = L1Arr;
        break;
      case 1:
        r[i].innerHTML = L2Arr;
        break;
      case 2:
        r[i].innerHTML = L1andL2;
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
