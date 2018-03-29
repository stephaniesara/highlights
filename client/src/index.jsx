import React from 'react';
import ReactDOM from 'react-dom';
import Highlights from './Highlights.jsx';

ReactDOM.hydrate(
  React.createElement(Highlights, window.initState),
  document.getElementById("highlights")
);