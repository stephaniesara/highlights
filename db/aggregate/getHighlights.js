// const pool = require('../dbPool.js');
const pool = require('../dbYelp.js');
const Promise = require('bluebird');
const helper = require('../../helpers/helper.js');

class Highlights {
	constructor() {
	}

	checkAllReviews (array) {
	  let wordsObj = {};
	  for (let i = 0; i < array.length; i++){
	    helper.findKeyWordsInReview(wordsObj, array[i].text);
	  }
	  // this.setState({wordsObj:wordsObj})
	  this.wordsObj = wordsObj;
	  // selects the 8 most used words in the freq. obj
	  // and makes an array of those 8 words.
	  let sorted = helper.filterKeyWordsWithCount(wordsObj)
	  // let sorted = helper.filterKeyWords(wordsObj);
	  // console.log(sorted);
	  // this.setState({commonWords:sorted});
	  this.commonWords = sorted;
	}

	findReviewWithKeyWordAndCount (keyWordArr, reviewArr) {
	  let reviewHighlights = [];
	  for (let i = 0; i < keyWordArr.length; i++) {
	    for (let j = 0; j < reviewArr.length; j++) {
	      if (reviewArr[j].text.includes(keyWordArr[i])){
	        let reviewHighlight = helper.findHighlightSentence(`${reviewArr[j].text}`, `${keyWordArr[i]}`);
	        if (reviewHighlight === null){
	          continue;
	        }
	        //here we can push any needed data into the HIGHLIGHT state item
	        reviewHighlight = reviewHighlight.length > 255 ? reviewHighlight.substring(0, 245) + '...' : reviewHighlight;
	        reviewHighlights.push([reviewHighlight, keyWordArr[i], this.commonWords[keyWordArr[i]], reviewArr[j].user_id]);
	        // we set that review's text to an emptry string so we don't
	        // check the same review twice.
	        reviewArr[j].text = "";
	        break;
	      }
	    }
	  }
	  // this.setState({highlights:reviewHighlights})
	  this.highlights = reviewHighlights;
	}

	addPhotoToHighlightArr(keywordArr, captionArr){
    // console.log('keyword', keywordArr);
    // console.log('caption', captionArr);
    for (var i = 0; i < keywordArr.length; i++){
      let keyword = keywordArr[i][1];
      for (var j = 0; j < captionArr.length; j++){
        var caption = captionArr[j].caption;
        if (helper.captionHasKeyword(keyword, caption)){
          // keywordArr[i].push(captionArr[j].id)
          keywordArr[i][3] = captionArr[j].id; // overwrite the user_id field with the photo_id
          captionArr[j].caption = "";
          // this.setState({photos:this.state.photos})
          break;
        }
      }
      // if wanted to use structure where fifth field in highlights arr is photo url
      // if (keywordArr[i].length === 4) {
	      // keywordArr[i].push(keywordArr[i][3]);
      // }
    }
  }
}


module.exports = (business_id) => {
	// console.log('BUSINESS ID', business_id)
	return new Promise((res, rej) => {
		const query = `select text, user_id, stars from review where business_id = '${business_id}' order by stars desc`;
		const highlights = new Highlights();
		pool.query(query, (err, data, fields) => {
			if (err) rej(err);
			highlights.reviews = data;
			highlights.checkAllReviews(data);
			var commonWords = Object.keys(highlights.commonWords);
			highlights.findReviewWithKeyWordAndCount(commonWords, highlights.reviews);

			const query = `select id, caption from photo where business_id = '${business_id}'`;
			pool.query(query, (err, data, fields) => {
				if (err) rej (err);
				// highlights.photos = data;
				highlights.addPhotoToHighlightArr(highlights.highlights, data)
				// console.log(highlights.highlights);
				res(highlights.highlights);
			})

			// res(highlights.highlights);
		});
	});
};