import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';
import $ from 'jquery';

export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      test: true
    }
  }

  getReviewDataFromDB(){
    $.ajax({
      url: 'http://127.0.0.1:3003/reviews',
      type: 'GET',
      success: (data) => {
        console.log('success', data)
      },
      error: (data) => {
        console.log('fail!')
      }
    })
  }

  render(){
    return (
      <div><button onClick={this.getReviewDataFromDB.bind(this)}>test data request</button>
      <HighlightEntry />
      </div>

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
