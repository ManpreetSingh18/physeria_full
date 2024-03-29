const mongoose = require("mongoose");
const EnergyEquivalenceSchema = new mongoose.Schema({
  speedOfLight: {
    type: Number
  },
  mass: {
    type: Array
  }
})

//defining collection
const EnergyEquivalence = new mongoose.model('EnergyEquivalence', EnergyEquivalenceSchema);

module.exports = EnergyEquivalence;
