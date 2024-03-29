const mongoose = require("mongoose");
const CompareEmfSchema = new mongoose.Schema({
  l1: {
    type: Array
  },
  l2: {
    type: Array
  }
})

//defining collection
const CompareEmf = new mongoose.model('CompareEmf', CompareEmfSchema);

module.exports = CompareEmf;
