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
      commonWords: {}
    }
  }

  removePunctuation(word) {
    var letters = {a:true, b:true, c:true, d:true, e:true, f:true, g:true, h:true, i:true,
       j:true, k:true, l:true, m:true, n:true, o:true, p:true, q:true, r:true, s:true,
       t:true, u:true, v:true, w:true, x:true, y:true, z:true};
    var newWord = "";
    for (var i = 0; i < word.length; i++){
      if (letters[word[i]]){
        newWord += word[i];
      }
    }
    return newWord;
};

findKeyWordsInReview(obj, str) {
  var words = str.split(" ");
  for (var i = 0; i < words.length; i++){
    let word = this.removePunctuation(words[i].toLowerCase());
    if (obj[word] === undefined){
      obj[word] = 1;
    } else {
      obj[word] += 1;
    }
  }
  return obj;
};

checkAllReviews(array) {
  var obj = {};
  for (var i = 0; i < array.length; i++){
    this.findKeyWordsInReview(obj, array[i].text);
  }
  this.setState({commonWords:obj});
};

  getReviewDataFromDB(){
    $.ajax({
      url: 'http://127.0.0.1:3003/reviews',
      type: 'GET',
      success: (data) => {
        console.log('success', data)
        this.setState({reviews:data})
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
