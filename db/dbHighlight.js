const mysql = require('mysql');

const db = mysql.createPool({
	connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "reviews",
  password: ""
});

module.exports = db;
