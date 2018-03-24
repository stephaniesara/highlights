const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const writeFile = 'data10M.csv';
var readFile = './aggregateData2.csv';
const numBusinessIds = 174567;
const maxIterator = 10000000;

var stream = fs.createWriteStream(writeFile);


let getRows = (entries, currRowInd, n, rows) => {
	var target = n % numBusinessIds || numBusinessIds; // target iterator 
	while (true) {
		var currRow = entries[currRowInd];
		if (currRow === undefined) break;
		var splitInd = currRow.indexOf(',');
		if (target === Number(currRow.substring(0, splitInd))) { // target iterator === curr iterator
			rows.push(n + currRow.substring(splitInd));
			currRowInd++;
		} else {
			break;
		}		
	}
	return currRowInd;
}

let writeFiles = async (entries, currRowInd = 0, n = 1, max = maxIterator) => {
	var isReady = stream.write(entries[currRowInd] + '\r\n');
	var rows;

	while(n <= max && isReady) {
		if (n % numBusinessIds === 1) {
			currRowInd = 1;
		}
		rows = [];	
		currRowInd = await getRows(entries, currRowInd, n, rows);
		if (n === max) {
			isReady = stream.write(rows.join('\r\n'));
		} else {
			isReady = stream.write(rows.join('\r\n') + '\r\n');
		}
		n++;
	}
	stream.once('drain', () => {
		writeFiles(entries, currRowInd, n, max);
	});
	console.log('draining at n =', n);
	// stream.end();
}

fs.readFileAsync(readFile, 'UTF-8')
.then((csv) => writeFiles(csv.split('\r\n')))