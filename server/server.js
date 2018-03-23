const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./../db/dbHighlight.js');
// const db = require('./../db/db.js')
const url = require('url-parse');
const currentUrl = url();
const path = require('path');
// const pool = require('./../db/dbPool.js')

app.use(express.static('./client/dist'))

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + './../client/dist/index.html'));
});

app.get('/highlights/:iterator', (req, res) => {
  var iterator = req.params.iterator;
  var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  db.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  })
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003!')
})
