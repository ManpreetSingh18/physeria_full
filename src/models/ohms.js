const mongoose = require("mongoose");
const OhmsSchema = new mongoose.Schema({
  resistance: {
    type: Number
  },
  voltage: {
    type: Array
  }
})


//defining collection
const OhmsLaw = new mongoose.model('OhmsLaw', OhmsSchema);

module.exports = OhmsLaw;
