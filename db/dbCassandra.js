const cassandra = require("cassandra-driver");

// for AWS db
const client = new cassandra.Client({
  contactPoints: ["172.31.20.187", "172.31.22.146"],
  keyspace: "yelp_highlights"
  // contactPoints: [ process.env.CASSANDRA_HOST || '127.0.0.1'],
  // keyspace: 'reviews2'
});

client.connect(function(err) {
  if (err) throw err;
});

module.exports = client;

// pooling: {
//        coreConnectionsPerHost: {
//          [distance.local] : 10,
//          [distance.remote] : 10
//        }
