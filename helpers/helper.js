// any function that doesn't change state should be here

function removePunctuation(word) {
  let letters = {
     a:true, b:true, c:true, d:true, e:true, f:true, g:true, h:true, i:true,
     j:true, k:true, l:true, m:true, n:true, o:true, p:true, q:true, r:true,
     s:true, t:true, u:true, v:true, w:true, x:true, y:true, z:true
   };
  let newWord = "";
  for (let i = 0; i < word.length; i++){
    if (letters[word[i]]){
      newWord += word[i];
    }
  }
  return newWord;
};

function findKeyWordsInReview(obj, str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++){
    let word = this.removePunctuation(words[i].toLowerCase());
    if (word.length < 6){
      continue;
    } else if (word === 'really' || word === 'restaurant' || word === 'restaurants'
    || word === 'ordered' || word === 'order' || word === 'because' || word === 'definitely'){
      continue;
    } else if (obj[word] === undefined){
      obj[word] = 1;
    } else {
      obj[word] += 1;
    }
  }
  return obj;
};

function filterKeyWordsWithCount(wordsObj) {
  let topWords = Object.keys(wordsObj).sort(function(a,b){return wordsObj[b]-wordsObj[a]})
  // console.log(wordsObj)
  var result = {};
  // topWords.forEach(elem => {
  //   result[elem] = wordsObj[elem];
  // })
  for (i = 0; i < 8; i++) {
    result[topWords[i]] = wordsObj[topWords[i]];
  }
  // console.log(result);
  return result;
  // return [topWords[0], topWords[1], topWords[2],
  // topWords[3], topWords[4], topWords[5], topWords[6], topWords[7]]
}

function filterKeyWords(wordsObj) {
  let topWords = Object.keys(wordsObj).sort(function(a,b){return wordsObj[b]-wordsObj[a]})

  return [topWords[0], topWords[1], topWords[2],
  topWords[3], topWords[4], topWords[5], topWords[6], topWords[7]]
}

function findHighlightSentence(review, keyword) {
  let singleReviewArray = review.match( /[^\.!\?]+[\.!\?]+/g );;
  if (singleReviewArray === null){
    return null;
  }
    for (let j = 0; j < singleReviewArray.length; j++) {
      if (singleReviewArray[j].includes(keyword)){
        return singleReviewArray[j];
      }
    }
  return 'error!';
};

function captionHasKeyword(keyword, caption){
  //TODO make this more specific if it causes problems.
return caption.toLowerCase().includes(keyword) ? true : false;
}

module.exports.removePunctuation = removePunctuation;
module.exports.findKeyWordsInReview = findKeyWordsInReview;
module.exports.filterKeyWordsWithCount = filterKeyWordsWithCount;
module.exports.filterKeyWords = filterKeyWords;
module.exports.findHighlightSentence = findHighlightSentence;
module.exports.captionHasKeyword = captionHasKeyword;
