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
      commonWords: []
    }
    this.getReviewDataFromDB = this.getReviewDataFromDB.bind(this);
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

  getReviewDataFromDB(){
    $.ajax({
      url: 'http://127.0.0.1:3003/reviews',
      type: 'GET',
      success: (data) => {
        console.log('success', data)
        this.setState({reviews:data})
        this.checkAllReviews(data)
      },
      error: (data) => {
        console.log('fail!')
      }
    })
  }

  render(){
    
    return (
      <div>
        <button onClick={this.getReviewDataFromDB.bind(this)}>test data request</button>
        <button onClick={this.checkAllReviews.bind(this, this.state.reviews)}>test find keyword button</button>
        <HighlightEntry />
      </div>

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
