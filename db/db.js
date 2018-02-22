const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tseliot88"
});

connection.connect(function(err) {
  if (err) console.log('ERROR');
  console.log('MYSQL IS CONNECTED')
})
