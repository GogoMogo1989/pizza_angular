const mongoose = require('mongoose');

//Documentum-upload álltal feltöltött adatok és annak sémája
const dataSchema = new mongoose.Schema({
    file: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^data:[a-z]+\/[a-z]+;base64,/.test(v);
        },
        message: 'A fájl nem base64 kódolt.'
      }
    },
    name:{
      type: String,
      required: true
    },
    component:{
      type: String,
      required: true
    },
    price:{
      type: String,
      required: true
    },
    option:{
      type:String,
      required: true
    }
  });

module.exports = mongoose.model('Data', dataSchema);