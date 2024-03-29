const mongoose = require("mongoose");
const DensitySonometerSchema = new mongoose.Schema({
  l1: {
    type: Array
  },
  l2: {
    type: Array
  }
})

//defining collection
const DensitySonometer = new mongoose.model('DensitySonometer', DensitySonometerSchema);

module.exports = DensitySonometer;
