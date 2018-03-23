import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import url from 'url-parse';
const currentUrl = url();
import helper from './../../helpers/helper.js'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styles from './app.css';


export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      highlights: [],
      itemsToShow: 4
    }
    this.getHighlightsFromDB = this.getHighlightsFromDB.bind(this);
  }

  componentDidMount(){
    this.getHighlightsFromDB();
  }

  getHighlightsFromDB() {
    var host = window.location.host.toString();
    console.log(host)
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
      url: `highlights/${url[0]}`,
      type: 'GET',
      success: (data) => {
        console.log('GET highlights success!', data);
        this.setState({highlights:data});
      },
      error: (data) => {
        console.log('GET failed!', data)
      }
    });
  }

  toggleNumberOfHighlights(){
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
   
    const highlights = this.state.highlights;

    const highlightEntries = highlights.slice(0, this.state.itemsToShow).map((highlight, index) => {
      console.log(highlight)
      let text = highlight.sentence.split(' ');
      let keyWord = highlight.keyword;
      let frequency = highlight.count;
      let photoURL = highlight.photo_url;

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

      let isBusinessUrl = highlight.is_business_photo;
      var imageURL = isBusinessUrl ? `https://s3-media3.fl.yelpcdn.com/bphoto/${photoURL}/120s.jpg` : `https://s3-media4.fl.yelpcdn.com/photo/${photoURL}/120s.jpg`;


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
        <span><img className="highlight-image" src={imageURL} /></span>
        <span className="highlight-text">
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
        <span><button className="num-hightlights-button" onClick={this.toggleNumberOfHighlights.bind(this)}>{innerHTML}</button></span>
      </div>

    )
  }
}
window.Highlights = Highlights;
ReactDOM.render(<Highlights />, document.getElementById('highlights'));
