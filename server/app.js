require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const dbMySQL = require('./../db/dbMySQL.js');
const dbCassandra = require('./../db/dbCassandra.js');
const url = require('url-parse');
// const currentUrl = url();
const path = require('path');

import React from 'react';
import { renderToString } from 'react-dom/server';
import Highlights from '../client/src/Highlights.jsx';
import Html from '../client/src/Html.js';

const morgan = require('morgan');

app.use(morgan('dev'));

// app.use(express.static('./client/dist'))

// app.get('/:id', (req, res) => {
//   console.log('app.get')
//   res.sendFile(path.join(__dirname + './../client/dist/index.html'));
// });

// app.use(express.static(path.resolve('dist')));

// app.use('/:id', (req, res, next) => {
//   console.log('app.get')
//   console.log(path.resolve('dist'));
//   // res.sendFile('index.html', { root: path.resolve('dist')})
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/highlights/:iterator', (req, res) => {
  console.log('app get highlights iterator')
  var iterator = req.params.iterator;
  console.log(iterator)
  var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  console.log('about to query cassandra!')
  dbCassandra.execute(query, (err, result) => {
    if (err) throw err;

  	const props = {
  		isLoaded: true,
      iterator: iterator,
      highlights: result.rows
  	};

  	// const body = renderToString(<Highlights props=props/>);
    const body = renderToString(React.createElement(Highlights, props));
    const title = 'test title'
    console.log('test1')
  	res.send(Html(body, props, title))
    console.log('test')
    // res.send(`<h1>hello world</h1>`)
    // res.send(result.rows);
  })
});

module.exports = app;

// // For load testing MySQL
// app.get('/highlights/mySQL/:iterator', (req, res) => {
//   var iterator = req.params.iterator;
//   var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
//   dbMySQL.query(query, (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows);
//   })
// });

// // For load testing Cassandra
// app.get('/highlights/Cassandra/:iterator', (req, res) => {
//   var iterator = req.params.iterator;
//   var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
//   dbCassandra.execute(query, (err, result) => {
//     if (err) throw err;
//     res.send(result.rows);
//   })
// });


