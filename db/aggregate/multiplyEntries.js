const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const writeFile = 'dataAll.csv';
var readFile = './aggregateData2.csv';
const numBusinessIds = 174567;

var stream = fs.createWriteStream(writeFile);


let getRows = (entries, currRowInd, n, rows) => {
	var target = n % numBusinessIds; // target iterator 
	while (true) {
		var currRow = entries[currRowInd];
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

let writeFiles = async (entries, currRowInd = 1, n = 1, max = numBusinessIds + 10) => {
	var isReady = stream.write(entries[0] + '\r\n');
	var rows;

	while(n <= max && isReady) {
		if (n === numBusinessIds) {
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
.then((csv) => writeFiles(csv.split('\r\n')));