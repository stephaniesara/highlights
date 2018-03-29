import React from 'react';
import ReactDOM from 'react-dom';
import Highlights from './Highlights.jsx';

// ReactDOM.render(<Highlights />, document.getElementById('highlights'));

// let url = window.location.href.split("/").pop();
// console.log(url);
console.log('index.js')
// ReactDOM.hydrate(<Highlights props={window.initState}/>, document.getElementById('highlights'));

// ReactDOM.hydrate(<Highlights />, document.getElementById('highlights'));
// window.Highlights = Highlights;


let url = window.location.href.split("/").pop();
url.charAt(url.length - 1) === "/" ? url.substr(0, url.length - 1) : url;
debugger

ReactDOM.hydrate(
  React.createElement(Highlights, 'TEST PROPS'),
  document.getElementById("highlights")
);