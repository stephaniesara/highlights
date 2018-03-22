const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const business_ids = require('../../business_ids_174567.json');
const numBusinessIds = business_ids.length;
const writeFile = 'aggregateData.csv';
// const max = 1000;
const getHighlight = require('./getHighlight.js');


var stream = fs.createWriteStream(writeFile);

let getRow = async (n) => {
	var row = [];
	row.push(n);
	var business_id = business_ids[(n - 1) % numBusinessIds].business_id;
	row.push(business_id);
	let text = await getHighlight(business_id);
	row.push(text);
	return row.join(',');
}

let writeFiles = async (n = 1, max = numBusinessIds + 1) => {
	let isReady = true;
	while(n <= max && isReady) {
		if (n === max) {
			var row = await getRow(n);
			isReady = stream.write(row);
		} else {
			var row = await getRow(n);
			isReady = stream.write(row + '\r\n');
		}
		n += 1;
	}
	stream.once('drain', () => {
		writeFiles(n);
	});
	console.log('draining at n =', n);
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