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
          //here we can push any needed data into the HIGHLIGHT state item
          reviewHighlights.push([reviewHighlight, keyWordArr[i], reviewArr[j].user_id]);
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
    const highlightEntries = allHighlights.map((highlight, index) => {
      let text = highlight[0];
      let keyWord = highlight[1];
      let userURL = highlight[2]
      let preK = [];
      let k = ` ${keyWord} `
      let postK = [];
      let highlighted = text.split(" ");
      let passedKeyword = false;
      let imageUrl = `https://s3-media4.fl.yelpcdn.com/photo/${userURL}/120s.jpg`

      for (var i = 0; i < highlighted.length; i++){
        if (highlighted[i] === keyWord){
          passedKeyword = true;
          continue;
        } else if (passedKeyword) {
          postK.push(highlighted[i])
        } else {
          preK.push(highlighted[i])
        }
      }

      return (
        <div className="highlight" key={index}>
        <span><img className="image" src={imageUrl} /></span>
        <span className="text">
          <span>{preK.join(" ")}</span>
          <span className="keyword">{k}</span>
          <span>{postK.join(" ")}</span>
        </span>
        </div>
      )
    });

    return (
      <div>
        <div>{highlightEntries}</div>
      </div>

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
