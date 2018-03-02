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

module.exports.connection = connection;
