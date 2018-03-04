import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';
import $ from 'jquery';
import url from 'url-parse';
const currentUrl = url();
import helper from './../../helpers/helper.js'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      wordsObj: {},
      reviews: [],
      commonWords: [],
      highlights: [],
      photos: [],
      itemsToShow: 4
    }
    this.getReviewDataFromDB = this.getReviewDataFromDB.bind(this);
    this.findReviewWithKeyWord = this.findReviewWithKeyWord.bind(this);
    this.getPhotoDataFromDB = this.getPhotoDataFromDB.bind(this);
    this.sortReviewsByRating = this.sortReviewsByRating.bind(this);
  }

  componentDidMount(){
    this.getReviewDataFromDB();
    this.getPhotoDataFromDB();
  }

// creates a word frequency object with all reviews.
  checkAllReviews(array) {
    let wordsObj = {};
    for (let i = 0; i < array.length; i++){
      helper.findKeyWordsInReview(wordsObj, array[i].text);
    }
    this.setState({wordsObj:wordsObj})
    // selects the 8 most used words in the freq. obj
    // and makes an array of those 8 words.
    let sorted = helper.filterKeyWords(wordsObj)
    this.setState({commonWords:sorted});
  };


  // goes through the freq. word array and
  // finds a cooresponding review for each word.
  // the element we create here is what gets mapped/rendered, so
  // we add the text, keyword, and user info along with it.
  // ex: [<review text>, <keyword>, <userAvatarURL>]
  findReviewWithKeyWord(keyWordArr, reviewArr) {
    let reviewHighlights = [];
    for (let i = 0; i < keyWordArr.length; i++) {
      for (let j = 0; j < reviewArr.length; j++) {
        if (reviewArr[j][1].includes(keyWordArr[i])){
          let reviewHighlight = helper.findHighlightSentence(`${reviewArr[j][1]}`, `${keyWordArr[i]}`);
          if (reviewHighlight === null){
            continue;
          }
          //here we can push any needed data into the HIGHLIGHT state item
          reviewHighlights.push([reviewHighlight, keyWordArr[i], reviewArr[j][2]]);
          // we set that review's text to an emptry string so we don't
          // check the same review twice.
          reviewArr[j][1] = "";
          break;
        }
      }
    }
    this.setState({highlights:reviewHighlights})
  }

  sortReviewsByRating(reviews){
    var sorted = [];
    for (var review in reviews) {
        sorted.push([reviews[review].stars, reviews[review].text, reviews[review].user_id]);
    }

    sorted.sort(function(a, b) {
        return b[0] - a[0];
    });
    return sorted;
  }

  getReviewDataFromDB(){
    // this gets our rest. ID from the browser window.
    let url = window.location.href.split('/').pop();
    url = url.split('?');
    if (url.length > 1) {
      let urlParams = url[1].split('&');
      urlParams = urlParams.reduce((acc, param) => {
        param = param.split('=');
        acc[param[0]] = param[1];
        return acc;
      }, {id: url[0]});
    }
    let restaurantID = url[0]

    $.ajax({
      url: 'http://127.0.0.1:3003/highlights/reviews',
      type: 'GET',
      data: {id:restaurantID},
      success: (data) => {
        console.log('GET review success!', data);

        this.setState({reviews:this.sortReviewsByRating(data)});
        this.checkAllReviews(data);
        this.findReviewWithKeyWord(this.state.commonWords, this.state.reviews);
      },
      error: (data) => {
        console.log('GET failed!')
      }
    });
  }

  // here we check each photo caption to see if it has a keyword.
  // if it does, we push that photo url into the highlight array.
  // the highlight array now looks like :
  // [review text, keyword, avatar url, optional: photo url]
  addPhotoToHighlightArr(keywordArr, captionArr){
    for (var i = 0; i < keywordArr.length; i++){
      let keyword = keywordArr[i][1];
      for (var j = 0; j < captionArr.length; j++){
        var caption = captionArr[j].caption;
        if (helper.captionHasKeyword(keyword, caption)){
          keywordArr[i].push(captionArr[j].id)
          captionArr[j].caption = "";
          this.setState({photos:this.state.photos})
          break;
        }
      }
    }
  }

  //here we do another ajax call and get all photos and captions for each restaurant
  // we also run our function addPhotoToHighlightArr.
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

    $.ajax({
      url: 'http://127.0.0.1:3003/highlights/photos',
      type: 'GET',
      data: {id:url[0]},
      success: (data) => {
        console.log('GET photo! success!', data);
        this.setState({photos:data})
        this.addPhotoToHighlightArr(this.state.highlights, this.state.photos)
        this.setState({highlights:this.state.highlights})
      },
      error: (data) => {
        console.log('GET failed!')
      }
    });
  }

  toggleNumOfHighlights(){
    if (this.state.itemsToShow === 4){
      this.setState({itemsToShow: 8})
    } else {
      this.setState({itemsToShow: 4})
    }
  }

  render(){
    // TODO: clean this up and move it to a seperate component
    if (this.state.itemsToShow === 4){
      var innerHTML = "Show more review highlights";
    } else {
      var innerHTML = "Show fewer review highlights";
    }
    const allHighlights = this.state.highlights;
    const highlightEntries = allHighlights.slice(0, this.state.itemsToShow).map((highlight, index) => {
      // remember, each highlight looks like
      // [<review text>, <keyword>, <user avatar><optional: food photo>]
      let text = highlight[0].split(" ");
      let keyWord = highlight[1];
      var userURL = highlight[2];
      var photoURL = highlight[3]
      let frequency = this.state.wordsObj[keyWord];

      // i might be really dumb, but i couldn't figure out how to
      // give a single word in a body of text have a different
      // class then the rest. so i break each review text into
      // three sections, pre-keyword, keyword, and post keyword.
      // it's really gross but it works. passedKeyword gets toggled
      // so we only do it the first time we hit the keyword.
      //TODO: make this better.

      let preK = [];
      let k;
      let postK = [];
      let passedKeyword = false;


      // if an image exists with the keyword in its caption, we use that.
      // otherwise, use the user's avatar.
      //TODO: use the actual avatar by scrapping the page like mike did.

      if (highlight.length === 3){
        var imageURL = `https://s3-media4.fl.yelpcdn.com/photo/${userURL}/120s.jpg`
      } else {
        var imageURL = `https://s3-media3.fl.yelpcdn.com/bphoto/${photoURL}/120s.jpg`
      }

      // this is the meat of the prek, k, postk thing from above.
      // gross i know, TODO: fix later.
      for (var i = 0; i < text.length; i++){
        if (text[i].toLowerCase().includes(keyWord)){
          passedKeyword = true;
          k = " " + text[i] + " ";
          continue;
        } else if (passedKeyword) {
          postK.push(text[i])
        } else {
          preK.push(text[i])
        }
      }
      let searchLink = `?q=${keyWord}`

      return (
        <div className="highlight" key={index}>
        <span><img className="image" src={imageURL} /></span>
        <span className="text">
          <span>{preK.join(" ")}</span>
          <span className="keyword"><a href={searchLink}>{k}</a></span>
          <span>{postK.join(" ")}</span>
          <span className="frequency"><a href={searchLink}> in {frequency} reviews</a></span>
        </span>
        </div>
      )
    });

    return (
      <div>
        <div className="allHighlights">
        <CSSTransitionGroup
          transitionName="highlightTransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {highlightEntries}
        </CSSTransitionGroup>
        </div>
        <span><button onClick={this.toggleNumOfHighlights.bind(this)}>{innerHTML}</button></span>
      </div>

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
