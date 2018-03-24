'use strict';

module.exports = {
	getRandomBusinessIterator
};

function getRandomBusinessIterator(userContext, events, done) {
	const randIterator = Math.floor(Math.random() * 10000000);
	userContext.vars.iterator = randIterator;
	return done();
}



// PREVIOUS FUNCTION WHEN TESTING BUSINESS_IDS (VS ITERATORS)

// const ids = require('../business_ids_174567.json');

// function getRandomBusinessId(userContext, events, done) {
// 	const randInd = Math.floor(Math.random() * 174567);
// 	const randId = ids[randInd].business_id;
// 	userContext.vars.business_id = randId;
// 	return done();
// }