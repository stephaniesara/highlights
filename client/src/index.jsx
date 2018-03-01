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
      wordsObj: {},
      reviews: [],
      commonWords: [],
      highlights: [],
      photos: []
    }
    this.getReviewDataFromDB = this.getReviewDataFromDB.bind(this);
    this.findReviewWithKeyWord = this.findReviewWithKeyWord.bind(this);
    this.getPhotoDataFromDB = this.getPhotoDataFromDB.bind(this);
  }

  componentDidMount(){
    this.getReviewDataFromDB();
    this.getPhotoDataFromDB();
  }

  checkAllReviews(array) {
    let wordsObj = {};
    for (let i = 0; i < array.length; i++){
      helper.findKeyWordsInReview(wordsObj, array[i].text);
    }
    this.setState({wordsObj:wordsObj})
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
    // var splitBy = /[?&]([^=#]+)=([^&#]*)/g,
    //     url = window.location.href,
    //     params = {},
    //     match;
    // while(match = splitBy.exec(url)) {
    //     params[match[1]] = match[2];
    // }
    //
    // var id = params.id;


    var url = window.location.href.split('/').pop();
    url = url.split('?');
    if (url.length > 1) {
      var urlParams = url[1].split('&');
      urlParams = urlParams.reduce((acc, param) => {
        param = param.split('=');
        acc[param[0]] = param[1];
        return acc;
      }, {id: url[0]});
    }
    console.log(url[0]);

    $.ajax({
      url: 'http://127.0.0.1:3003/reviews/highlights',
      type: 'GET',
      data: {id:url[0]},
      success: (data) => {
        console.log('GET review success!', data);
        this.setState({reviews:data});
        this.checkAllReviews(data);
        this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
      },
      error: (data) => {
        console.log('GET failed!')
      }
    });
  }

//go through highlight array,
  // for each keyword, find a photo that contains a keyword
  //  if one is found, push into highlight array
  // if none is found, do nothing.
  // later, if highlight array[3] is undefined, use avatar url
    // else, use photo url.

  captionHasKeyword(keyword, caption){
    // let cap = caption.split(" ");
    // for (var i = 0; i < )
    //TODO make this more specific if it causes problems.

    if (caption.toLowerCase().includes(keyword)){
      return true;
    }
    return false;
  }

  addPhotoToHighlightArr(keywordArr, captionArr){
    for (var i = 0; i < keywordArr.length; i++){
      // let updatedHighlight = keywordArr[i];
      let keyword = keywordArr[i][1];
      for (var j = 0; j < captionArr.length; j++){
        var caption = captionArr[j].caption;
        if (this.captionHasKeyword(keyword, caption)){
          keywordArr[i].push(captionArr[j].id)
          captionArr[j].caption = "";
          this.setState({photos:this.state.photos})
          break;
        }
      }
    }
  }

  getPhotoDataFromDB(){
    var url = window.location.href.split('/').pop();
    url = url.split('?');
    if (url.length > 1) {
      var urlParams = url[1].split('&');
      urlParams = urlParams.reduce((acc, param) => {
        param = param.split('=');
        acc[param[0]] = param[1];
        return acc;
      }, {id: url[0]});
    }
    console.log(url[0]);

    $.ajax({
      url: 'http://127.0.0.1:3003/reviews/photos',
      type: 'GET',
      data: {id:url[0]},
      success: (data) => {
        console.log('GET photo! success!', data);
        this.setState({photos:data})
        this.addPhotoToHighlightArr(this.state.highlights, this.state.photos)
        this.setState({highlights:this.state.highlights})
        // this.setState({reviews:data});
        // this.checkAllReviews(data);
        // this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
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
      var userURL = highlight[2];
      var photoURL = highlight[3]
      let frequency = this.state.wordsObj[keyWord];
      let preK = [];
      let k;
      let postK = [];
      let highlighted = text.split(" ");
      let passedKeyword = false;
      if (highlight.length === 3){
        var imageURL = `https://s3-media4.fl.yelpcdn.com/photo/${userURL}/120s.jpg`
      } else {
        var imageURL = `https://s3-media3.fl.yelpcdn.com/bphoto/${photoURL}/120s.jpg`
      }

      for (var i = 0; i < highlighted.length; i++){
        if (highlighted[i].toLowerCase().includes(keyWord)){
          passedKeyword = true;
          k = " " + highlighted[i] + " ";
          continue;
        } else if (passedKeyword) {
          postK.push(highlighted[i])
        } else {
          preK.push(highlighted[i])
        }
      }

      return (
        <div className="highlight" key={index}>
        <span><img className="image" src={imageURL} /></span>
        <span className="text">
          <span>{preK.join(" ")}</span>
          <span className="keyword">{k}</span>
          <span>{postK.join(" ")}</span>
          <span className="frequency"> in {frequency} reviews</span>
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
