const Promise = require("bluebird");
const fs = require("fs");
const business_ids = require("../../business_ids_174567.json");
const numBusinessIds = business_ids.length;
const writeFile = "aggregateData2.csv";
const getHighlights = require("./getHighlights.js");

var escapeChars = str => {
  return str
    .replace(/,/g, "\\,")
    .replace(/\r?\n|\r/g, "")
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'");
};

var stream = fs.createWriteStream(writeFile);

let getRow = async n => {
  var restaurantRows = [];
  var business_id = business_ids[(n - 1) % numBusinessIds].business_id;
  var highlights = await getHighlights(business_id);
  highlights.forEach(highlight => {
    var row = [];
    row.push(n);
    row.push(business_id);
    row.push(escapeChars(highlight[0])); // sentence
    row.push(highlight[1]); // keyword
    row.push(highlight[2]); // count
    row.push(highlight[3]); // photo_url
    row.push(highlight[4]); // is_business_photo
    restaurantRows.push(row.join(","));
  });
  return restaurantRows.join("\r\n");
};

let writeFiles = async (n = 1, max = numBusinessIds) => {
  var header = [
    "iterator",
    "business_id",
    "sentence",
    "keyword",
    "count",
    "photo_url",
    "is_business_photo"
  ];
  var isReady = stream.write(header.join(",") + "\r\n");
  while (n <= max && isReady) {
    if (n === max) {
      isReady = stream.write(await getRow(n));
    } else {
      isReady = stream.write((await getRow(n)) + "\r\n");
    }
    n += 1;
  }
  stream.once("drain", () => {
    writeFiles(n);
  });
  console.log("draining at n =", n);
  // stream.end();
};

writeFiles();
