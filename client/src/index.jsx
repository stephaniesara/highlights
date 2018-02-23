import React from 'react';
import ReactDOM from 'react-dom';
import HighlightEntry from './modules/HighlightEntry.jsx';

export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      test: true
    }
  }

  render(){
    return (

      <HighlightEntry />

    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
