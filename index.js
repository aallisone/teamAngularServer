const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb+srv://user1:Password@cluster0-rahtc.mongodb.net/my-database?retryWrites=true', (err, db) => {
  if (err) return console.log(err)

  app.listen(3000, () => {
    console.log('This is where the magic happens')
  });

  let dbase = db.db("my-database");

  app.post('/products/add', (req, res) => {

    let products = {
      name: req.body.name,
      price: req.body.price
    };

    dbase.collection("products").save(products, (err, result) => {
      if(err) {
        console.log(err);
      }

      res.send('product added successfully');
    });

  });

  app.get('/products', (req, res) => {
    dbase.collection('products').find().toArray( (err, results) => {
      res.send(results)
    });
  });

  app.get('/products/:id', (req, res) => {
    if(err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    dbase.collection('products').find(id).toArray( (err, result) => {
      if(err) {
        throw err;
      }

      res.send(result);
    });
  });

  app.put('/products/update/:id', (req, res) => {
    var id = {
      _id: new ObjectID(req.params.id)
    };

    dbase.collection("products").update(id, {$set:{name: req.body.name, price: req.body.price}}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('product updated sucessfully');
    });
  });


  app.delete('/products/delete/:id', (req, res) => {
    let id = ObjectID(req.params.id);

    dbase.collection('products').deleteOne({_id: id}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('product deleted');
    });
  });

});