import React from 'react';
import ReactDOM from 'react-dom';
import Highlights from './Highlights.jsx';

// let url = window.location.href.split('/').pop();
// url = url.split('?');
// if (url.length > 1) {
//   let urlParams = url[1].split('&');
//   urlParams = urlParams.reduce((acc, param) => {
//     param = param.split('=');
//     acc[param[0]] = param[1];
//     return acc;
//   }, {id: url[0]});
// }
// let restaurantID = url[0]

let iterator = window.location.href.split('/').pop();

ReactDOM.hydrate(
  React.createElement(Highlights, window.initState),
  document.getElementById("highlights")
);