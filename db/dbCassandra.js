const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: [ '172.31.20.187', '172.31.22.146' ],
	keyspace: 'yelp_highlights'
	// contactPoints: [ process.env.CASSANDRA_HOST || '127.0.0.1'],
	// keyspace: 'reviews2'
});

client.connect(function (err) {
  if (err) throw err;
});

client.on('log', function(level, className, message, furtherInfo) {
  if (level != 'verbose') {
    console.log('cassandra: %s -- %s', level, message);
  }
});

module.exports = client;




// pooling: {
//        coreConnectionsPerHost: {
//          [distance.local] : 10,
//          [distance.remote] : 10
//        }