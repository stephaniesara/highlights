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


app.get('/highlights/reviews/:id', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  var id = req.params.id;
  // console.log('highlights id', id)
  // var query = `SELECT text, user_id, stars FROM review WHERE business_id = "${id}" ORDER BY stars DESC`
  // var query = `SELECT text, user_id, stars FROM review WHERE business_id = "${id}"`
  // var query = `SELECT user_id, stars FROM review WHERE business_id = "${id}"`
  //  db.connection.query(query, function(err, rows, fields){
  //   if (err) throw err
  //   // var reviews = rows;
  //   // console.log(reviews.length)
  //   res.header("Access-Control-Allow-Origin", "*").send(rows)
  // });
  var query = `select text from review where business_id = '${id}'`;
  db.connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  })
  // res.header("Access-Control-Allow-Origin", "*").send('test');
});

app.get('/highlights/photos/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var id = req.params.id;
  var query = `SELECT id, caption FROM photo WHERE business_id = "${id}"`
   db.connection.query(query, function(err, rows, fields){
    if (err) throw err
    var photos = rows;
    res.header("Acess-Control-Allow-Origin", "*").send(photos)
  });
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003!')
})
