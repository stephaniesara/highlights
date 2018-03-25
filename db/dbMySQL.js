const mysql = require('mysql');

const db = mysql.createPool({
	connectionLimit: 1,
  host: "localhost",
  user: "root",
  database: "reviews",
  password: ""
});

module.exports = db;