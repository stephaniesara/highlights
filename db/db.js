const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "chompy-test-database.cr8yw4uwndba.us-west-1.rds.amazonaws.com",
  user: "root",
  database: "chompyremote",
  password: "chompydatabase"
});

connection.connect(function(err) {
  if (err) console.log('ERROR');
  console.log('MYSQL IS CONNECTED')
})

module.exports.connection = connection;
