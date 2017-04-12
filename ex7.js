var express = require('express')
var path = require('path')
var fs = require('fs')
const crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var myapp = express();

myapp.set('views', __dirname);
myapp.set('view engine', 'ejs');

myapp.get("/decipher", function (req, res) {

  MongoClient.connect('mongodb://127.0.0.1:27017/testDB', function (err, db) {
    if (err) throw err;
    db.collection('testCol').findOne({}, { message: 1, _id: 0 }, function (err, doc) {
      if (err) throw err;
      const decipher = crypto.createDecipher('aes256', 'asaadsaad');
      let decrypted = decipher.update(doc.message, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      console.log(decrypted);
      db.close();
      res.render('result', { message: decrypted })

    });

  })



})


myapp.listen(3000, () => { console.log("server started") })