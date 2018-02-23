const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tseliot88",
  database: "yelp_db"
});

connection.connect(function(err) {
  if (err) console.log('ERROR');
  console.log('MYSQL IS CONNECTED')
})

// var query = `SELECT text FROM review WHERE business_id = "--6MefnULPED_I942VcFNA"`
// var getReviews = connection.query(query, function(err, rows, fields){
//   if (err) throw err
//   return rows;
// });

module.exports.connection = connection;
