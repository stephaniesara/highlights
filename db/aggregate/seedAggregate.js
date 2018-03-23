const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const business_ids = require('../../business_ids_174567.json');
const numBusinessIds = business_ids.length;
const writeFile = 'aggregateData.csv';
// const max = 1000;
const getHighlights = require('./getHighlights.js');

var escapeChars = (str) => {
	return str.replace(/,/g, '\\,').replace(/\r?\n|\r/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
}

var stream = fs.createWriteStream(writeFile);

let getRow = async (n) => {
	var restaurantRows = [];
	var business_id = business_ids[(n - 1) % numBusinessIds].business_id;
	var highlights = await getHighlights(business_id);
	// var photos = await getPhotos(business_id);
	highlights.forEach(highlight => {
		var row = [];
		row.push(n);
		row.push(business_id);
		row.push(escapeChars(highlight[0])); // sentence
		row.push(highlight[1]); // keyword
		row.push(highlight[2]); // count
		row.push(highlight[3]); // photo_url
		restaurantRows.push(row.join(','));
	})
	return restaurantRows.join('\r\n');
}

let writeFiles = async (n = 1, max = 10) => {
	// let isReady = true;
	var header = ['iterator', 'business_id', 'sentence', 'keyword', 'count', 'photo_url'];
	var isReady = stream.write(header.join(',') + '\r\n');
	while(n <= max && isReady) {
		if (n === max) {
			isReady = stream.write(await getRow(n));
		} else {
			isReady = stream.write(await getRow(n) + '\r\n');
		}
		n += 1;
	}
	stream.once('drain', () => {
		writeFiles(n);
	});
	console.log('draining at n =', n);
	// stream.end();
}

writeFiles();




// var csvWriter = require('csv-write-stream');
// var writer = csvWriter({sendHeaders: false});

// writer.pipe(fs.createWriteStream(writeFile));


// var writeRows = () => {
// 	return new Promise((res, rej) => {
// 		for (var i = 1; i <= max; i++) {

// 		}

// 	})
// 	for (var i = 1; i <= max; i++) {
// 		writer.write({iterator: 1, business_id: 'test', highlight: 'anothertest'});
// 		// writer.end();
// 	}
// }

// const seedRows = () => {
// 	// loop through all iterators
// 		// get business_id from 174k
// 		// calculate highlight
// 		// create row: iterator / business_id / highlight
// 		// write row to csv file

// 	for (var i = 0; i < max; i++) {
// 		var row = [];
// 		row.push(i);
// 		row.push(JSON.stringify(business_ids[i % numBusinessIds].business_id));
// 		var highlight = 'test';
// 		row.push(highlight + '\r\n');
// 		var rowToAppend = row.join(',');
// 		fs.appendFile(writeFile, rowToAppend, 'utf8');
// 		// .then(() => {
// 		// 	console.log('inserted row')
// 		// })
// 		// .catch(error => {
// 		// 	console.log('error')
// 		// })
// 	}
// }

// seedRows();