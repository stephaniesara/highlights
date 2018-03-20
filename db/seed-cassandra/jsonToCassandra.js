const fs = require('fs');

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: [ process.env.CASSANDRA_HOST || '127.0.0.1'],
	keyspace: 'test'
});

client.connect(function (err) {
  if (err) throw err;
});


module.exports = {
	readJSON: () => {
		var obj = fs.readFile('/Users/stephaniesarachong/Desktop/10000.csv.json', (err, data) => {
			if (err) throw err;
			// console.log(data);
			module.exports.processJSON(JSON.parse(data));
		})
	},

	processJSON: (data) => {
		data.slice(0, 1000).forEach(review => {
			// console.log(review)
			var queryString = `insert into review JSON '{"id": "${review.id}", "business_id": "${review.business_id}", "user_id": "${review.user_id}", "stars": "${review.stars}", "date": "${review.date}", "text": "${encodeURI(JSON.stringify(review.text))}", "useful": "${review.useful}", "funny": "${review.funny}", "cool": "${review.cool}", "iterator": "${review.iterator}"}'`;
			// console.log(queryString);
			client.execute(queryString, (err, result) => {
				if (err) throw err;
				console.log('INSERTED')
			})
		})
	}
}

module.exports.readJSON();
