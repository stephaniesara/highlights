// import { renderReact } from 'hypernova-react';
// import MyComponent from '../src/Highlights.jsx';

// export default renderReact(
//   'MyComponent.js', // this file's name (or really any unique name)
//   MyComponent,
// );

const React = require('react');
const renderReact = require('hypernova-react').renderReact;
const MyComponent = require('../client/src/Highlights.jsx')

module.exports = renderReact('MyComponent.js', MyComponent);
