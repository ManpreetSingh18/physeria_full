const mongoose = require("mongoose");
const MeterBridgeSchema = new mongoose.Schema({
  
  resistance: {
    type: Array
  },
  balance: {
    type: Array
  }
})

//defining collection
const MeterBridge = new mongoose.model('MeterBridge', MeterBridgeSchema);

module.exports = MeterBridge;
