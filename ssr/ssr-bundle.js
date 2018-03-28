(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

var _urlParse = __webpack_require__(4);

var _urlParse2 = _interopRequireDefault(_urlParse);

var _helper = __webpack_require__(5);

var _helper2 = _interopRequireDefault(_helper);

var _CSSTransitionGroup = __webpack_require__(6);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _app = __webpack_require__(7);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentUrl = (0, _urlParse2.default)();

var Highlights = function (_React$Component) {
  _inherits(Highlights, _React$Component);

  function Highlights() {
    _classCallCheck(this, Highlights);

    var _this = _possibleConstructorReturn(this, (Highlights.__proto__ || Object.getPrototypeOf(Highlights)).call(this));

    _this.state = {
      highlights: [],
      itemsToShow: 4
    };
    _this.getHighlightsFromDB = _this.getHighlightsFromDB.bind(_this);
    return _this;
  }

  _createClass(Highlights, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getHighlightsFromDB();
    }
  }, {
    key: 'getHighlightsFromDB',
    value: function getHighlightsFromDB() {
      var _this2 = this;

      // var host = window.location.host.toString();
      // console.log(host)
      // // this gets our rest. ID from the browser window.
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

      _jquery2.default.ajax({
        // url: `highlights/${url[0]}`,
        url: 'highlights/1',
        type: 'GET',
        success: function success(data) {
          console.log('GET highlights success!', data);
          _this2.setState({ highlights: data });
        },
        error: function error(data) {
          console.log('GET failed!', data);
        }
      });
    }
  }, {
    key: 'toggleNumberOfHighlights',
    value: function toggleNumberOfHighlights() {
      if (this.state.itemsToShow === 4) {
        this.setState({ itemsToShow: 8 });
      } else {
        this.setState({ itemsToShow: 4 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: clean this up and move it to a seperate component
      if (this.state.itemsToShow === 4) {
        var innerHTML = "Show more review highlights";
      } else {
        var innerHTML = "Show fewer review highlights";
      }

      var highlights = this.state.highlights;

      var highlightEntries = highlights.slice(0, this.state.itemsToShow).map(function (highlight, index) {
        console.log(highlight);
        var text = highlight.sentence.split(' ');
        var keyWord = highlight.keyword;
        var frequency = highlight.count;
        var photoURL = highlight.photo_url;

        // i might be really dumb, but i couldn't figure out how to
        // give a single word in a body of text have a different
        // class then the rest. so i break each review text into
        // three sections, pre-keyword, keyword, and post keyword.
        // it's really gross but it works. passedKeyword gets toggled
        // so we only do it the first time we hit the keyword.
        //TODO: make this better.

        var preK = [];
        var k = void 0;
        var postK = [];
        var passedKeyword = false;

        // if an image exists with the keyword in its caption, we use that.
        // otherwise, use the user's avatar.
        //TODO: use the actual avatar by scrapping the page like mike did.

        var isBusinessUrl = highlight.is_business_photo;
        var imageURL = isBusinessUrl ? 'https://s3-media3.fl.yelpcdn.com/bphoto/' + photoURL + '/120s.jpg' : 'https://s3-media4.fl.yelpcdn.com/photo/' + photoURL + '/120s.jpg';

        // this is the meat of the prek, k, postk thing from above.
        // gross i know, TODO: fix later.
        for (var i = 0; i < text.length; i++) {
          if (text[i].toLowerCase().includes(keyWord)) {
            passedKeyword = true;
            k = " " + text[i] + " ";
            continue;
          } else if (passedKeyword) {
            postK.push(text[i]);
          } else {
            preK.push(text[i]);
          }
        }
        var searchLink = '?q=' + keyWord;

        return _react2.default.createElement(
          'div',
          { className: 'highlight', key: index },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('img', { className: 'highlight-image', src: imageURL })
          ),
          _react2.default.createElement(
            'span',
            { className: 'highlight-text' },
            _react2.default.createElement(
              'span',
              null,
              preK.join(" ")
            ),
            _react2.default.createElement(
              'span',
              { className: 'keyword' },
              _react2.default.createElement(
                'a',
                { href: searchLink },
                k
              )
            ),
            _react2.default.createElement(
              'span',
              null,
              postK.join(" ")
            ),
            _react2.default.createElement(
              'span',
              { className: 'frequency' },
              _react2.default.createElement(
                'a',
                { href: searchLink },
                ' in ',
                frequency,
                ' reviews'
              )
            )
          )
        );
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'allHighlights' },
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              transitionName: 'highlightTransition',
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 500 },
            highlightEntries
          )
        ),
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'button',
            { className: 'num-hightlights-button', onClick: this.toggleNumberOfHighlights.bind(this) },
            innerHTML
          )
        )
      );
    }
  }]);

  return Highlights;
}(_react2.default.Component);

// export default Highlights;
// window.Highlights = Highlights;
// ReactDOM.render(<Highlights />, document.getElementById('highlights'));


exports.default = Highlights;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("url-parse");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// any function that doesn't change state should be here

function removePunctuation(word) {
  var letters = {
    a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true, i: true,
    j: true, k: true, l: true, m: true, n: true, o: true, p: true, q: true, r: true,
    s: true, t: true, u: true, v: true, w: true, x: true, y: true, z: true
  };
  var newWord = "";
  for (var _i = 0; _i < word.length; _i++) {
    if (letters[word[_i]]) {
      newWord += word[_i];
    }
  }
  return newWord;
};

function findKeyWordsInReview(obj, str) {
  var words = str.split(" ");
  for (var _i2 = 0; _i2 < words.length; _i2++) {
    var word = this.removePunctuation(words[_i2].toLowerCase());
    if (word.length < 6) {
      continue;
    } else if (word === 'really' || word === 'restaurant' || word === 'restaurants' || word === 'ordered' || word === 'order' || word === 'because' || word === 'definitely') {
      continue;
    } else if (obj[word] === undefined) {
      obj[word] = 1;
    } else {
      obj[word] += 1;
    }
  }
  return obj;
};

function filterKeyWordsWithCount(wordsObj) {
  var topWords = Object.keys(wordsObj).sort(function (a, b) {
    return wordsObj[b] - wordsObj[a];
  });
  // console.log(wordsObj)
  var result = {};
  // topWords.forEach(elem => {
  //   result[elem] = wordsObj[elem];
  // })
  for (i = 0; i < 8; i++) {
    result[topWords[i]] = wordsObj[topWords[i]];
  }
  // console.log(result);
  return result;
  // return [topWords[0], topWords[1], topWords[2],
  // topWords[3], topWords[4], topWords[5], topWords[6], topWords[7]]
}

function filterKeyWords(wordsObj) {
  var topWords = Object.keys(wordsObj).sort(function (a, b) {
    return wordsObj[b] - wordsObj[a];
  });

  return [topWords[0], topWords[1], topWords[2], topWords[3], topWords[4], topWords[5], topWords[6], topWords[7]];
}

function findHighlightSentence(review, keyword) {
  var singleReviewArray = review.match(/[^\.!\?]+[\.!\?]+/g);;
  if (singleReviewArray === null) {
    return null;
  }
  for (var j = 0; j < singleReviewArray.length; j++) {
    if (singleReviewArray[j].includes(keyword)) {
      return singleReviewArray[j];
    }
  }
  return 'error!';
};

function captionHasKeyword(keyword, caption) {
  //TODO make this more specific if it causes problems.
  return caption.toLowerCase().includes(keyword) ? true : false;
}

module.exports.removePunctuation = removePunctuation;
module.exports.findKeyWordsInReview = findKeyWordsInReview;
module.exports.filterKeyWordsWithCount = filterKeyWordsWithCount;
module.exports.filterKeyWords = filterKeyWords;
module.exports.findHighlightSentence = findHighlightSentence;
module.exports.captionHasKeyword = captionHasKeyword;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-transition-group/CSSTransitionGroup");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./app.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./app.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "a {\n  color: inherit;\n  text-decoration: none;\n}\n\na:hover {\n   color: inherit;\n }\n\n .writereview {\n   border: 1px solid black;\n }\n\n .num-hightlights-button {\n    background-color: Transparent;\n    background-repeat:no-repeat;\n    border: none;\n    cursor:pointer;\n    overflow: hidden;\n    outline:none;\n    color: blue;\n}\n.num-hightlights-button:hover {\n    text-decoration: underline;\n}\n\n\n.highlight {\n  width: 630px;\n  display: flex;\n}\n\n.highlight-text {\n  padding: 10px;\n  font-size: 12px;\n}\n\n.highlight-image {\n  height: 60px;\n  width: 60px;\n  border-radius: 5px;\n}\n\n.keyword {\n  /* color: #65D36D; */\n  font-size: 11px;\n  color: royalblue;\n  font-weight: bold;\n}\n\n.frequency {\n  font-size: 11px;\n  color: grey;\n}\n\n.highlightTransition-enter {\n  opacity: 0.01;\n}\n\n.highlightTransition-enter.highlightTransition-enter-active {\n  opacity: 1;\n  transition: opacity 500ms ease-in;\n}\n\n.highlightTransition-leave {\n  opacity: 1;\n}\n\n.highlightTransition-leave.highlightTransition-leave-active {\n  opacity: 0.01;\n  transition: opacity 500ms ease-in;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ])));