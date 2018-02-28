import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';
import $ from 'jquery';
import url from 'url-parse';
const currentUrl = url();
import helper from './../../helpers/helper.js'

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

  checkAllReviews(array) {
    let wordsObj = {};
    for (let i = 0; i < array.length; i++){
      helper.findKeyWordsInReview(wordsObj, array[i].text);
    }
    let sorted = helper.filterKeyWords(wordsObj)
    this.setState({commonWords:sorted});
  };


  findReviewWithKeyWord(keyWordArr, reviewArr) {
    let reviewHighlights = [];
    for (let i = 0; i < keyWordArr.length; i++) {
      for (let j = 0; j < reviewArr.length; j++) {
        if (reviewArr[j].text.includes(keyWordArr[i])){
          let reviewHighlight = helper.findHighlightSentence(`${reviewArr[j].text}`, `${keyWordArr[i]}`);
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
        console.log('GET success!', data);
        this.setState({reviews:data});
        this.checkAllReviews(data);
        this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
      },
      error: (data) => {
        console.log('GET failed!')
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
