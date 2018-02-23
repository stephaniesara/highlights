const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./../db/db.js')

app.use(express.static('./client/dist'))



app.get('/reviews', (req, res) => {
  var query = `SELECT text FROM review WHERE business_id = "pSMK_FtULKiU-iuh7SMKwg"`
   db.connection.query(query, function(err, rows, fields){
    if (err) throw err
    res.send(rows)
  });
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003. Your hair looks great today, btw')
})
