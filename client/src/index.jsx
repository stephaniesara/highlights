import React from 'react';
import ReactDOM from 'react-dom';

export default class Highlights extends React.Component {
  constructor(){
    super()
    this.state = {
      test: true
    }
  }

  render(){
    return (
      <div>Hello World</div>
    )
  }
}

ReactDOM.render(<Highlights />, document.getElementById('highlights'));
