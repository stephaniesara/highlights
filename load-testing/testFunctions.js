'use strict';

module.exports = {
	getWeightedBusinessIterator
};

function getRandomBusinessIterator(userContext, events, done) {
	const randIterator = Math.floor(Math.random() * 10000000);
	userContext.vars.iterator = randIterator;
	return done();
}

function getWeightedBusinessIterator(userContext, events, done) {
	const randIterator = Math.floor(Math.random() * 10000);
	userContext.vars.iterator = randIterator;
	return done();