const crypto = require('crypto');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const mysql = require('mysql');
const databaseName = 'yelp_db_reviews';
const tableName = 'review_copy';

// hashing function to create a new hashed id from old id
var newId = function (id) {
  var sha1 = crypto.createHash("sha1");
  sha1.update(id);
  return sha1.digest("hex").substring(0, 22);
}

var db = mysql.createConnection({
	url: 'localhost',
	user: 'root',
	password: ''
});

var getIds = () => {
	return new Promise((res, rej) => {
		db.query(`select id from ${tableName}`)
		.then((data) => {
			data.map(row => {
				row.hashId = newId(row.id);
				return row;
			})
			fs.writeFileAsync('test.json', JSON.stringify(data), 'utf8');
		})
		.then(() => {
			console.log(`finished selecting from table ${tableName}`);
			res();
		})
		.catch(error => {
			console.log(`Error selecting from table ${tableName}`);
			rej(error);
		})
	})
}

// Insert data rows in chunks
var insertSlice = (slice) => {
	return Promise.map(slice, row => {
		var queryString = (`update ${tableName} set hash_id = '${row.hashId}' where id = '${row.id}'`);
		return db.query(queryString);
	});
}

var insertHashIds = () => {
	return new Promise((res, rej) => {
		var getData = fs.readFileAsync('test.json', 'utf8')
		getData.then(data => {
			return JSON.parse(data);
		})
		.then(data => {
			var slices = [];
			var i = 0;
			var max = data.length;
			var increment = 10000;
			while (i < max) {
				slices.push(data.slice(i, i + increment));
				i += increment;
			}
			console.log(slices.length)
			
			return slices.reduce((prevPromise, slice) => {
				return prevPromise.then(() => insertSlice(slice));
			}, Promise.resolve());
		})
		.then(() => {
			console.log(`finished inserting hashes into table ${tableName}`);
			res();
		})
		.catch(error => {
			console.log(`Error inserting hashes into table ${tableName}`);
			rej(error);
		})
	})
}

db.query = Promise.promisify(db.query);
db.connect = Promise.promisify(db.connect);

db.connect()
.then(() => db.query(`use ${databaseName}`))
// .then(() => db.query(`alter table ${tableName} add hash_id varchar(22) not null`))
// .then(() => getIds())
.then(() => insertHashIds())
.then(() => db.end());















// console.log(newId('id'))

// var queryString = `update ${tableName} set id = ${newId(`id`)}`;
// var queryString = `update ${tableName} set id = ${newId('hey')}`;
// console.log(queryString)
// db.query(queryString, [], function(err) {
// 	console.log('done')
// });

