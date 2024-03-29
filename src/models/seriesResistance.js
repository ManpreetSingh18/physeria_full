const mongoose = require("mongoose");
const SeriesResistanceSchema = new mongoose.Schema({
  resistance: {
    type: Array
  },
  balance: {
    type: Array
  }
})




//defining collection
const SeriesResistance = new mongoose.model('SeriesResistance', SeriesResistanceSchema);

module.exports = SeriesResistance;
