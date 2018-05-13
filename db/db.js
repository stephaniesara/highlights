const mysql = require("mysql");

// for AWS db
// const connection = mysql.createConnection({
//   host: "chompy-test-database.cr8yw4uwndba.us-west-1.rds.amazonaws.com",
//   user: "root",
//   database: "chompyremote",
//   password: "chompydatabase"
// });

// for local db
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "yelp_db",
//   password: ""
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "reviews",
  password: ""
});

connection.connect(function(err) {
  if (err) console.log("ERROR");
  console.log("MYSQL IS CONNECTED");
});

module.exports.connection = connection;
