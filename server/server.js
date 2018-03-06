const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./../db/db.js')
const url = require('url-parse');
const currentUrl = url();
const path = require('path');

app.use(express.static('./client/dist'))

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + './../client/dist/index.html'));
});


app.get('/highlights/reviews', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var id = req.query.id;
  console.log('highlights id', id)
  var reviews;
  var query = `SELECT text, user_id, stars FROM review WHERE business_id = "${id}" ORDER BY stars DESC`
   db.connection.query(query, function(err, rows, fields){
    if (err) throw err
    var reviews = rows;
    res.send(reviews)
  });
});

app.get('/highlights/photos', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var id = req.query.id;
  var reviews;
  var query = `SELECT id, caption FROM photo WHERE business_id = "${id}"`
   db.connection.query(query, function(err, rows, fields){
    if (err) throw err
    var photos = rows;
    res.send(photos)
  });
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003!')
})
