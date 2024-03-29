const mongoose = require("mongoose");
const CrystalSchema = new mongoose.Schema({
  disprobe: {
    type: Number
  },
  thickness: {
    type: Number
  },
  current: {
    type: Number
  },
  thermometer: {
    type: Number
  },
  voltage: {
    type: Array
  },
  temperature: {
    type: Array
  }
})

//defining collection
const Crystal = new mongoose.model('Crystal', CrystalSchema);

module.exports = Crystal;
