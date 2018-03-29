import React from 'react';
import { hydrate } from 'react-dom';
import Highlights from './Highlights.jsx';

hydrate(
  React.createElement(Highlights, window.initState),
  document.getElementById("highlights")
);