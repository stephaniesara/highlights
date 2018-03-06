const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chompy"
});

connection.connect(function(err) {
  if (err) console.log('ERROR');
  console.log('MYSQL IS CONNECTED')
})

module.exports.connection = connection;
