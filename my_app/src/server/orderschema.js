const mongoose = require('mongoose');

//Basket komponens álltal feltöltött adatok sémája
const orderSchema = new mongoose.Schema({
    totalPrice: {
      type: Number,
      required: true
    },
    allNames:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    street:{
      type: String,
      required: true
    },
    houseNumber:{
      type: String,
      required: true
    },
    floor:{
      type: String,
      required: true
    },
    door:{
      type: String,
      required: true
    },
    phoneNumber:{
      type: String,
      required: true
    },
    zip:{
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Order', orderSchema)