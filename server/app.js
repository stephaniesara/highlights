require("newrelic");
const express = require("express");
const app = express();
const dbCassandra = require("./../db/dbCassandra.js");
const path = require("path");
const redisClient = require("./redis.js");

import React from "react";
import { renderToString } from "react-dom/server";
import Highlights from "../client/src/Highlights.jsx";
import indexHtml from "./indexHtml.js";
import html from "./html.js";

// serve static files
//app.use('/bundle.js', express.static('./dist/bundle.js'));
app.use(express.static("./dist"));

// returns html template of Highlights only - for proxy server
app.get("/api/highlights/ssr/:iterator", (req, res) => {
  var iterator = req.params.iterator;
  redisClient.get(iterator, (err, result) => {
    if (result) {
      const fromCache = JSON.parse(result);
      res.send(html(fromCache[0], JSON.stringify(fromCache[1])));
    } else {
      var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
      dbCassandra.execute(query, (err, result) => {
        if (err) throw err;
        const props = { highlights: result.rows };
        const body = renderToString(React.createElement(Highlights, props));
        res.send(html(body, JSON.stringify(props)));
        const toCache = JSON.stringify([body, props]);
        redisClient.setex(iterator, 60, toCache);
      });
    }
  });
});

// returns complete index.html
app.get("/main/highlights/ssr/:iterator", (req, res) => {
  var iterator = req.params.iterator;
  redisClient.get(iterator, (err, result) => {
    if (result) {
      const fromCache = JSON.parse(result);
      res.send(indexHtml(fromCache[0], JSON.stringify(fromCache[1])));
    } else {
      var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
      dbCassandra.execute(query, (err, result) => {
        if (err) throw err;
        const props = { highlights: result.rows };
        const body = renderToString(React.createElement(Highlights, props));
        res.send(indexHtml(body, JSON.stringify(props)));
        const toCache = JSON.stringify([body, props]);
        redisClient.setex(iterator, 60, toCache);
      });
    }
  });
});

// returns a complete index.html template
// app.get('/main/highlights/ssr/:iterator', (req, res) => {
//   var iterator = req.params.iterator;
//   var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
//   dbCassandra.execute(query, (err, result) => {
//     if (err) throw err;
//     const props = { highlights: result.rows };
//     const body = renderToString(React.createElement(Highlights, props));
//     res.send(indexHtml(body, JSON.stringify(props)))
//   })
// });

module.exports = app;
