const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: [ process.env.CASSANDRA_HOST || '127.0.0.1'],
	keyspace: 'reviews2'
});

client.connect(function (err) {
  if (err) throw err;
});

module.exports = client;




// pooling: {
//        coreConnectionsPerHost: {
//          [distance.local] : 10,
//          [distance.remote] : 10
//        }