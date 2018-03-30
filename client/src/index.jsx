import React from 'react';
import { hydrate } from 'react-dom';
import Highlights from './Highlights.jsx';

hydrate(
  React.createElement(Highlights, window.__HIGHLIGHTS_INITIAL_STATE__),
  document.getElementById("highlights")
);