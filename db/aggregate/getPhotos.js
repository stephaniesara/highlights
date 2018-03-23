// const pool = require('../dbYelp.js');
// const Promise = require('bluebird');
// const helper = require('../../helpers/helper.js');

// class Photos {
// 	constructor() {
// 	}
// }


// module.exports = (business_id) => {
// 	return new Promise((res, rej) => {
// 		const query = `select id, caption from photo where business_id = '${business_id}'`;
// 		const photos = new Photos();
// 		pool.query(query, (err, data, fields) => {
// 			if (err) rej(err);
// 			// console.log('GET review success!', data);


// 			photos.photos = data;
// 			photos.addPhotoToHighlightArr(this.highlights, this.photos);
// 			photos.highlights = 

//       // this.setState({photos:data})
//       // this.addPhotoToHighlightArr(this.state.highlights, this.state.photos)
//       // this.setState({highlights:this.state.highlights})


// 			highlights.reviews = data;
// 			highlights.checkAllReviews(data);
// 			// console.log(highlights.commonWords);
// 			var commonWords = Object.keys(highlights.commonWords);
// 			// console.log(commonWords);
// 			highlights.findReviewWithKeyWordAndCount(commonWords, highlights.reviews);
// 			// console.log(highlights.highlights);

//    //      this.setState({reviews:data});
//    //      this.checkAllReviews(data);
//    //      this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
//    //      this.addPhotoToHighlightArr(this.state.highlights, this.state.photos)
// 			// res(JSON.stringify(rows));
// 			res(highlights.highlights);
// 		});
// }