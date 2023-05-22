const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));

// MongoDB kapcsolódás
const url = 'mongodb+srv://GogoMogo1989:Password12345@cluster0.ugoukmn.mongodb.net/Pizza_Angular?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!');
  })
  .catch((err) => {
    console.log('Hiba a MongoDB adatbázis kapcsolat során:', err);
  });

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


//Regisztráció és a hozzátartozó séma
const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
});

//Adatok feltöltése
const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/data', (req, res) => {
  if (!req.body || !req.body.file) {
    res.status(400).send('Nincs fájl az adatokban!');
    return;
  }

  const data = new DataModel({
    file: req.body.file,
    name: req.body.name,
    component: req.body.component,
    price: req.body.price,
    option: req.body.option
  });

  data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  });
});

//Adatok lekérdezése 
app.get('/api/data', (req, res) => {
  DataModel.find({}).then((data) => {
    console.log('Az adatok lekérdezése sikeres volt!')
    res.send(data);
  }).catch((err) => {
    console.log('Hiba az adatok lekérdezésekor:', err);
    res.status(500).send('Hiba az adatok lekérdezésekor!');
  });
});

//Adatok törlése
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  DataModel.findByIdAndDelete(id)
    .then(() => {
      console.log('Az adat törlése sikeres volt!');
      res.status(200).json({ message: 'Az adat törlése sikeres volt!' });
    })
    .catch((err) => {
      console.log('Hiba az adat törlésekor:', err);
      res.status(500).send('Hiba az adat törlésekor!');
    });
});

//Rendelt adatok feltöltése
const OrderModel = mongoose.model('Order', orderSchema)

app.post('/api/data/order', (req, res) => {
  const order = new OrderModel({
    totalPrice: req.body.totalPrice,
    allNames: req.body.allNames,
    name: req.body.name,
    city: req.body.city,
    zip: req.body.zip,
    street: req.body.street,
    houseNumber: req.body.houseNumber,
    floor: req.body.floor,
    door: req.body.door,
    phoneNumber: req.body.phoneNumber,
  });

  order.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  });
});

//Rendelt adatok lekérdezése 
app.get('/api/data/order', (req, res) => {
  OrderModel.find({}).then((data) => {
    console.log('Az adatok lekérdezése sikeres volt!')
    res.send(data);
  }).catch((err) => {
    console.log('Hiba az adatok lekérdezésekor:', err);
    res.status(500).send('Hiba az adatok lekérdezésekor!');
  });
});

//Rendelt adatok törlése
app.delete('/api/data/order/:id', (req, res) => {
  const id = req.params.id;
  OrderModel.findByIdAndDelete(id)
    .then(() => {
      console.log('Az adat törlése sikeres volt!');
      res.status(200).json({ message: 'Az adat törlése sikeres volt!' });
    })
    .catch((err) => {
      console.log('Hiba az adat törlésekor:', err);
      res.status(500).send('Hiba az adat törlésekor!');
    });
});

//Regisztráció
const User = mongoose.model('User', userSchema);

app.post('/admin/signup', (req, res) => {
  const { userName, password} = req.body;

  const newUser = new User({ userName, password });

  newUser.save()
    .then(() => {
      console.log('Felhasználó mentve!');
      res.status(200).json({ message: 'Felhasználó mentve!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Hiba történt a mentés során!' });
    });
});

//Bejelentkezés
app.post('/admin/login', (req, res) => {
  const {userName, password} = req.body;

  User.findOne({ userName: userName, password: password})
    .then(user => {
      if (!user) {
        console.log('Hibás felhasználó név vagy jelszó!');
        res.status(401).json({ message: 'Hibás felhasználó név vagy jelszó!' });
      } else {
        console.log('Bejelentkezés sikeres!');
        res.status(200).json({ message: 'Bejelentkezés sikeres!'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Hiba történt a bejelentkezés során!' });
    });
});


const port = process.env.PORT || 3000;

app.listen(port, ()  => console.log(`A szerver fut a ${port}-es porton!`));