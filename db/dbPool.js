const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: "chompy-test-database.cr8yw4uwndba.us-west-1.rds.amazonaws.com",
//   user: "root",
//   database: "chompyremote",
//   password: "chompydatabase"
// });

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "yelp_db",
//   password: ""
// });

const pool = mysql.createPool({
	connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "reviews",
  password: ""
});

// connection.connect(function(err) {
//   if (err) console.log('ERROR');
//   console.log('MYSQL IS CONNECTED')
// })

// pool.getConnection((err, connection) => {
// 	if (err) throw err;
// 	console.log('connected to pools!')
// })

module.exports = pool;
