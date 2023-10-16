const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  _id: {
    type: String,
    // ref: "",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  tokenAmount: {
    type: Number,
    default: 0,
  }
  ,
  productId: {
    type: String,

  },
  order_id: {
    type: String,

  }
  ,
  currency: {
    type: String,

  }
  ,
  paymentSignature: {
    type: String,

  }
  ,
  paymentId: {
    type: String,

  },
  orderId: {
    type: String,
  }

});

module.exports = mongoose.model("Participant", participantSchema);
