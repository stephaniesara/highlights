'use strict';

module.exports = {
	getRandomBusinessId
};

const ids = require('./business_ids_100000.json');

function getRandomBusinessId(userContext, events, done) {
	const randInd = Math.floor(Math.random() * 100000);
	const randId = ids[randInd].business_id;
	userContext.vars.business_id = randId;
	return done();
}