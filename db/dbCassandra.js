const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: [ '52.53.180.202'], // node1(seed)
	//contactPoints: ['13.56.210.47'], // node2
	keyspace: 'yelp_highlights'
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
