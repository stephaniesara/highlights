const db = require('../dbPool.js');
const Promise = require('bluebird');

module.exports = (business_id) => {
	return new Promise((res, rej) => {
		db.query('select stars from review where iterator = 1', (err, rows, fields) => {
			if (err) rej(err);
			res(JSON.stringify(rows));
		});
		
	});
	//console.log(err)''



	// return db.query('select * from review where iterator = 1', (err, rows, fields) => {
	// 	return 'highlight of business_id' + business_id;
	// });
	// return new Promise((res, rej) => {
	// 	db.query('select stars from review where iterator = 1')
	// 	.then((data) => {
	// 		return 'highlight';
	// 		res('highlight');
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 		rej(error);
	// 	})
	// })
};