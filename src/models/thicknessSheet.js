const mongoose = require("mongoose");
const ThicknessSheetSchema = new mongoose.Schema({
  leastcount: {
    type: Number
  },
  zeroerror: {
    type: Number
  },
  linearscale: {
    type: Array
  },
  circularscale: {
    type: Array
  }
})

//defining collection
const ThicknessSheet = new mongoose.model('ThicknessSheet', ThicknessSheetSchema);

module.exports = ThicknessSheet;
