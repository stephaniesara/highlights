require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbCassandra = require('./../db/dbCassandra.js');
const url = require('url-parse');
const path = require('path');

import React from 'react';
import { renderToString } from 'react-dom/server';
import Highlights from '../client/src/Highlights.jsx';
import html from './html.js';

app.use(express.static('./dist'))

app.get('/highlights/:iterator', (req, res) => {
  var iterator = req.params.iterator;
  var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  dbCassandra.execute(query, (err, result) => {
    if (err) throw err;

  	const props = {
      highlights: result.rows
  	};

    const body = renderToString(React.createElement(Highlights, props));
  	res.send(html(body, JSON.stringify(props)))
  })
});

module.exports = app;