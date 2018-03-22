'use strict';

module.exports = {
	getRandomBusinessId
};

const ids = require('../business_ids_174567.json');

function getRandomBusinessId(userContext, events, done) {
	const randInd = Math.floor(Math.random() * 174567);
	const randId = ids[randInd].business_id;
	userContext.vars.business_id = randId;
	return done();
}