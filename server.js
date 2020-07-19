const express = require('express');
const bodyParser = require('body-parser');
const {
  MongoClient,
  ObjectID,
} = require('mongodb');

let db;
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post('/add-cart', (req, res) => {
  const recipe = {
    date: Date.now(),
    versions: [
      req.body.recipe,
    ],
  };
  db.collection('recipes15').insertOne(recipe, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result.ops);
  });
});

app.put('/add-cart/:id', (req, res) => {
  const id = ObjectID(req.body.id);

  db.collection('recipes15').updateOne({
    _id: id,
  }, {
    $push: {
      versions: req.body.value,
    },
  });
  return res.sendStatus(200);
});

app.get('/add-cart', (req, res) => {
  db.collection('recipes15').find().toArray((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.log(err);
  }
  db = client.db('cookbook');
  app.listen(4000, () => {
    console.log('__started');
  });
});