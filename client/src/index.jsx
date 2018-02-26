import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';
import $ from 'jquery';
import url from 'url-parse';
const currentUrl = url();

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
        if (reviewArr[j].text.includes(keyWordArr[i])){
          let reviewHighlight = this.findHighlightSentence(`${reviewArr[j].text}`, `${keyWordArr[i]}`);
          if (reviewHighlight === null){
            continue;
          }
          reviewHighlights.push(reviewHighlight);
          reviewArr[j].text = "";
          break;
        }
      }
    }
    this.setState({highlights:reviewHighlights})
  }

  findHighlightSentence(review, keyword) {
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

  getReviewDataFromDB(){
    //TODO this is kinda janky to get the url and may
    //cause conflicts later, but it works for now.
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href,
        params = {},
        match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    var id = params.id;

    $.ajax({
      url: 'http://127.0.0.1:3003/reviews',
      type: 'GET',
      data: {id:id},
      success: (data) => {
        console.log('success', data);
        this.setState({reviews:data});
        this.checkAllReviews(data);
        this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
      },
      error: (data) => {
        console.log('fail!')
      }
    });
  }

  render(){
    const allHighlights = this.state.highlights;
    const highlightEntries = allHighlights.map((highlight, index) =>
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
