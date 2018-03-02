const helper = require('./../helpers/helper.js');
//test

test('expects removePunctuation to remove punctuation from end of words.', () => {
  expect(helper.removePunctuation('hello!')).toBe('hello');
});

test('expects removePunctuation to remove punctuation from within words', () => {
  expect(helper.removePunctuation('$h@e,l$@l"o!')).toBe('hello');
});

test('expects findKeyWordsInReview to only map long words', () => {
  let obj = {};
  let review = "pepperoni service what pepperoni"
  expect(helper.findKeyWordsInReview(obj, review)).toEqual({'pepperoni':2, 'service':1})
});

test('expects filterKeyWords to find top 8 words', () => {
  let wordsObj = {"one":3, "two":3, "three":3, "four":3, "five":3, "six":3, "seven":3, "eight":3};
  let array = ["one", "two", "three", "four", "five","six","seven",
"eight"];
  expect(helper.filterKeyWords(wordsObj)).toEqual(array)
});

test('expects filterKeyWords to find top 8 words based on frequency', () => {
  let wordsObj = {"zero":1, "oneTest": 17, "one":3, "two":5, "three":3, "four":3, "five":3, "six":3, "seven":3, "eight":3};
  let array = ["oneTest", "two", "one", "three", "four", "five","six", "seven"];
  expect(helper.filterKeyWords(wordsObj)).toEqual(array)
});

test('expects findHighlightSentence to return review sentence with key word in it.', () => {
  let review = "The service was good. The food was terrific!";
  let keyword = "service";
  expect(helper.findHighlightSentence(review, keyword)).toEqual("The service was good.")
});

test('expects findHighlightSentence to return an error if word cannot be found in review', () => {
  let review = "The service was good. The food was terrific!";
  let keyword = "wonderful";
  expect(helper.findHighlightSentence(review, keyword)).toEqual("error!")
});

test('expects captionHasKeyword to check if a caption has a keyword', () => {
  let caption = "The service was wonderful. The food was terrific!";
  let keyword = "wonderful";
  expect(helper.captionHasKeyword(keyword, caption)).toEqual(true)
});
