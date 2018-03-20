// $ node seedCassandra.js

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: [ process.env.CASSANDRA_HOST || '127.0.0.1'],
	keyspace: 'reviews'
});

client.connect(function (err) {
  if (err) throw err;
});

module.exports = {
	// testSelect: (callback) => {
	// 	let queryString = `select * from countries where id = 1`;
	// 	client.execute(queryString, (err, result) => {
	// 		if (err) throw err;
	// 		callback(null, result);
	// 	})
	// },

	// copyFromCSV: (callback) => {
	// 	let queryString = `copy testtable from 'test.csv' with header = true;`;
	// 	// let queryString = `copy testtable from 'test.csv' with header = false;`;
	// 	client.execute(queryString, (err, result) => {
	// 		callback(err, result);
	// 	})
	// }

	executeQuery: (iterator, callback) => {
		var queryString = `select * from review where iterator = ${iterator}`;
		client.execute(queryString, (err, result) => {
			callback(err, result, iterator);
		})
	},

	countRows: (callback) => {
		const max = 10523338;
		for (var i = 0; i < 2000; i++) { // randomly test 2000 iterators
			var iterator = Math.floor(Math.random() * max);
			module.exports.executeQuery(iterator, callback);
		}
	}

}

var countCorrect = 0;

// repeat this 10 times to randomly test 20,000 iterators
module.exports.countRows((err, result, i) => {
	if (err) throw err;
	if (result.rowLength === 0) {
		console.log('******************\n')
		console.log('DID NOT GET RESULT WITH ITERATOR', i)
		console.log(result)
	} else {
		countCorrect++;
		if (countCorrect === 2000) {
			console.log('countCorrect hit 2000')
			process.exit();
		}
	}
})

// FAILED ITERATORS:
// 276770 <- super weird formatting fail!!!
// 6781479 - 6781488 <- QUOTATION

// module.exports.copyFromCSV((err, result) => {
// 	if (err) throw err;
// 	console.log('***************\nseeded from csv');
// 	process.exit();
// })

// TO RUN
// node seedCassandra.js

// module.exports.testSelect((err, result) => {
// 	console.log('**************************\ngot result')
// 	console.log('rows', result.rows)
// 	console.log('rowLength', result.rowLength)
// 	console.log('columns', result.columns)
// 	process.exit();
// });