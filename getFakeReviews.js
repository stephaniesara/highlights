const faker = require('faker');
const fs = require('fs');

// var schema = [
// 	'id',
// 	'business_id',
// 	'user_id',
// 	'stars',
// 	'date',
// 	'text',
// 	'useful',
// 	'funny',
// 	'cool'
// ]

const schema = [
	'iterator',
	'text',
	'stars'
	// 'business_id',
	// 'user_id'
]

var result = schema.reduce((accum, curr) => {
	return accum + ',' + curr;	
})
console.log(result)

const dataMax = 10;

var dataFake = [];

for (var iterator = 1; iterator <= dataMax; iterator++) {
	var curr = {
		iterator: iterator, // iterator
		text: faker.lorem.paragraphs(faker.random.number({min: 1, max: 3})), // text
		stars: faker.random.number({min: 1, max: 5}) // stars
	};
	dataFake.push(curr);
}

fs.writeFile('fake.json', JSON.stringify(result), err => {
	if (err) throw err;
	console.log('data have been written to file')
})