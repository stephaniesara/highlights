// refactored from legacy script
// migrated algorithm from client side to db worker

// const pool = require('../dbPool.js');
const pool = require("../dbYelp.js");
const Promise = require("bluebird");
const helper = require("../../helpers/helper.js");

class Highlights {
  constructor() {}

  checkAllReviews(array) {
    let wordsObj = {};
    for (let i = 0; i < array.length; i++) {
      helper.findKeyWordsInReview(wordsObj, array[i].text);
    }
    this.wordsObj = wordsObj;
    // selects the 8 most used words in the freq. obj
    // and makes an array of those 8 words.
    let sorted = helper.filterKeyWordsWithCount(wordsObj);
    this.commonWords = sorted;
  }

  findReviewWithKeyWordAndCount(keyWordArr, reviewArr) {
    let reviewHighlights = [];
    for (let i = 0; i < keyWordArr.length; i++) {
      for (let j = 0; j < reviewArr.length; j++) {
        if (reviewArr[j].text.includes(keyWordArr[i])) {
          let reviewHighlight = helper.findHighlightSentence(
            `${reviewArr[j].text}`,
            `${keyWordArr[i]}`
          );
          if (reviewHighlight === null) {
            continue;
          }
          //here we can push any needed data into the HIGHLIGHT state item
          reviewHighlight =
            reviewHighlight.length > 255
              ? reviewHighlight.substring(0, 245) + "..."
              : reviewHighlight;
          reviewHighlights.push([
            reviewHighlight,
            keyWordArr[i],
            this.commonWords[keyWordArr[i]],
            reviewArr[j].user_id
          ]);
          // we set that review's text to an emptry string so we don't
          // check the same review twice.
          reviewArr[j].text = "";
          break;
        }
      }
    }
    this.highlights = reviewHighlights;
  }

  addPhotoToHighlightArr(keywordArr, captionArr) {
    for (var i = 0; i < keywordArr.length; i++) {
      let keyword = keywordArr[i][1];
      for (var j = 0; j < captionArr.length; j++) {
        var caption = captionArr[j].caption;
        if (helper.captionHasKeyword(keyword, caption)) {
          keywordArr[i][3] = captionArr[j].id; // overwrite the user_id field with the photo_id
          keywordArr[i][4] = 1;
          captionArr[j].caption = "";
          break;
        }
      }
      // if wanted to use structure where fifth field in highlights arr is photo url
      if (keywordArr[i].length === 4) {
        keywordArr[i][4] = 0;
      }
    }
  }
}

module.exports = business_id => {
  return new Promise((res, rej) => {
    const query = `select text, user_id, stars from review where business_id = '${business_id}' order by stars desc`;
    const highlights = new Highlights();
    pool.query(query, (err, data, fields) => {
      if (err) rej(err);
      highlights.reviews = data;
      highlights.checkAllReviews(data);
      var commonWords = Object.keys(highlights.commonWords);
      highlights.findReviewWithKeyWordAndCount(commonWords, highlights.reviews);

      if (highlights.highlights.length === 0) {
        var dummyHighlight = [];
        dummyHighlight.push(
          "This is a dummy highlight. Why? Because these reviews are in French or German."
        );
        dummyHighlight.push("dummy");
        dummyHighlight.push(1);
        dummyHighlight.push(highlights.reviews[0].user_id); // use photo URL of user who wrote first returned review
        dummyHighlight.push(0);
        highlights.highlights.push(dummyHighlight);
        res(highlights.highlights);
      } else {
        const query = `select id, caption from photo where business_id = '${business_id}'`;
        pool.query(query, (err, data, fields) => {
          if (err) rej(err);
          highlights.addPhotoToHighlightArr(highlights.highlights, data);

          res(highlights.highlights);
        });
      }
    });
  });
};
