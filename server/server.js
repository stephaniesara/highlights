const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./../db/db.js')
const url = require('url-parse');
const currentUrl = url()

app.use(express.static('./client/dist'))



app.get('/reviews', (req, res) => {
  console.log('url test2', req.query.id)
  var id = req.query.id;
  var query = `SELECT text FROM review WHERE business_id = "${id}"`
   db.connection.query(query, function(err, rows, fields){
    if (err) throw err
    res.send(rows)
  });
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003!')
})
