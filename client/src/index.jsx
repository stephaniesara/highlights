import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';
import $ from 'jquery';

export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      test: true,
      reviews: [],
      commonWords: [],
      highlights: []
    }
    this.getReviewDataFromDB = this.getReviewDataFromDB.bind(this);
    this.findReviewWithKeyWord = this.findReviewWithKeyWord.bind(this);
  }

  componentDidMount(){
    this.getReviewDataFromDB();
  }
  removePunctuation(word) {
    let letters = {a:true, b:true, c:true, d:true, e:true, f:true, g:true, h:true, i:true,
       j:true, k:true, l:true, m:true, n:true, o:true, p:true, q:true, r:true, s:true,
       t:true, u:true, v:true, w:true, x:true, y:true, z:true};
    let newWord = "";
    for (let i = 0; i < word.length; i++){
      if (letters[word[i]]){
        newWord += word[i];
      }
    }
    return newWord;
  };

  findKeyWordsInReview(obj, str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++){
      let word = this.removePunctuation(words[i].toLowerCase());
      if (word.length < 6){
        continue;
      } else if (obj[word] === undefined){
        obj[word] = 1;
      } else {
        obj[word] += 1;
      }
    }
    return obj;
  };

  checkAllReviews(array) {
    let wordsObj = {};
    for (let i = 0; i < array.length; i++){
      this.findKeyWordsInReview(wordsObj, array[i].text);
    }
    let sorted = this.filterKeyWords(wordsObj)
    this.setState({commonWords:sorted});
  };

  filterKeyWords(wordsObj) {
    let topWords = Object.keys(wordsObj).sort(function(a,b){return wordsObj[b]-wordsObj[a]})
    return [topWords[0], topWords[1], topWords[2], topWords[3], topWords[4], topWords[5], topWords[6], topWords[7]]
  }

  findReviewWithKeyWord(keyWordArr, reviewArr) {
    let reviewHighlights = [];
    for (let i = 0; i < keyWordArr.length; i++) {
      for (let j = 0; j < reviewArr.length; j++) {
        // debugger;
        if (reviewArr[j].text.includes(keyWordArr[i])){
          // reviewHighlights.push(reviewArr[j].text);
          let reviewHighlight = this.findHighlightSentence(`${reviewArr[j].text}`, `${keyWordArr[i]}`);
          console.log('review highlight', reviewHighlight)
          reviewHighlights.push(reviewHighlight);
          reviewArr[j].text = "";
          break;
        }
      }
    }
    console.log(reviewHighlights)

    this.setState({highlights:reviewHighlights})
  }

  findHighlightSentence(review, keyword) {
    let reviewSplits = review.split('.');
      for (let j = 0; j < reviewSplits.length; j++) {
        if (reviewSplits[j].includes(keyword)){
          return reviewSplits[j] + '.';
        }
      }
      // reviewSplits = review.split('!')
      // for (let i = 0; i < reviewSplits.length; j++) {
      //   if (reviewSplits[j].includes(keyword)){
      //     return reviewSplits[j] + '!';
      //   }
      // }
    return 'error!';
};

  getReviewDataFromDB(){
    $.ajax({
      url: 'http://127.0.0.1:3003/reviews',
      type: 'GET',
      success: (data) => {
        console.log('success', data);
        this.setState({reviews:data});
        this.checkAllReviews(data);
        this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
      },
      error: (data) => {
        console.log('fail!')
      }
    })
  }

  render(){
    const words = this.state.highlights;
    const highlightEntries = words.map((highlight, index) =>
      <div key={index}><br />{highlight} <br /></div>
    )
    return (
      <div>
        <div>{highlightEntries}</div>
      </div>

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
