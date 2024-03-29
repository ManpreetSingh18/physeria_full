const mongoose = require("mongoose");
const TwoJunctionSchema = new mongoose.Schema({
  emf: {
    type: Number
  },
  resistance_potentiometer: {
    type: Number
  },
  resistance_resistancebox: {
    type: Number
  },
  length_potentiometer: {
    type: Number
  },
  temperature: {
    type: Array
  },
  length: {
    type: Array
  }
})

//defining collection
const TwoJunction = new mongoose.model('TwoJunction', TwoJunctionSchema);

module.exports = TwoJunction;
