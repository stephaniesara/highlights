const mysql = require('mysql');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const databaseName = 'reviews';
const tableName = 'review';
const limit = 174567;

var db = mysql.createConnection({
	url: 'localhost',
	user: 'root',
	database: databaseName,
	password: ''
});


var writeIdsToFile = (data) => {
	// console.log(data);
	return fs.writeFile(`business_ids_${limit}.json`, JSON.stringify(data), 'utf8');
}

db.query = Promise.promisify(db.query);
db.connect = Promise.promisify(db.connect);

db.connect()
.then(() => db.query(`select distinct business_id from ${tableName} limit ${limit}`))
.then((data) => writeIdsToFile(data))
.then(() => db.end());
