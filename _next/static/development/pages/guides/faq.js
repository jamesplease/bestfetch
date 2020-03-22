(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/guides/faq.js"],{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fguides%2Ffaq&absolutePagePath=%2FUsers%2Fjames%2Fwebdev%2Fbestfetch%2Fpages%2Fguides%2Ffaq.js!./":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fguides%2Ffaq&absolutePagePath=%2FUsers%2Fjames%2Fwebdev%2Fbestfetch%2Fpages%2Fguides%2Ffaq.js ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/guides/faq", function() {
      var mod = __webpack_require__(/*! ./pages/guides/faq.js */ "./pages/guides/faq.js")
      if(true) {
        module.hot.accept(/*! ./pages/guides/faq.js */ "./pages/guides/faq.js", function() {
          if(!next.router.components["/guides/faq"]) return
          var updatedPage = __webpack_require__(/*! ./pages/guides/faq.js */ "./pages/guides/faq.js")
          next.router.update("/guides/faq", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_2adc2403d89adc16ead0 ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_2adc2403d89adc16ead0 */ "dll-reference dll_2adc2403d89adc16ead0"))("./node_modules/react/index.js");

/***/ }),

/***/ "./pages/guides/faq.js":
/*!*****************************!*\
  !*** ./pages/guides/faq.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FAQ; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/james/webdev/bestfetch/pages/guides/faq.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function FAQ() {
  return __jsx("div", {
    className: "page",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4,
      columnNumber: 7
    }
  }, "FAQ"), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 7
    }
  }, "Sometimes ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 19
    }
  }, "res.data"), " set to ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 48
    }
  }, "null"), ", why is that?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, "If the response cannot be parsed as the ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 49
    }
  }, "responseType"), ", then", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, "res.data"), " will be ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 39
    }
  }, "null"), "."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }, "There are two common situations for this:"), __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, "The response body is an empty string when you specify", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 11
    }
  }, "responseType: 'json'"), ". Empty strings are not valid JSON."), __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, "The response body is an invalid JSON string when you specify", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 11
    }
  }, "responseType: 'json'"), " For example, some APIs will return plain text messages in the response body when there are errors, like the word \"Error\", rather than valid JSON.")), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, "To resolve this, you can use the ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 42
    }
  }, "responseType"), " option to have greater control over the parsing of the response body from the server."), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }, "Why is ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 16
    }
  }, "responseType"), " even an option?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }, "This option exists because of the inner workings of the", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, "fetch"), " API."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, "The argument that is passed to the ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 44
    }
  }, ".then()"), " callback of a", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }
  }, "fetch()"), " call is a", ' ', __jsx("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }
  }, "Response object"), ". The body of a Response object can only be read a single time, because it is a", ' ', __jsx("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }, "ReadableStream"), "."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }, "For bestfetch to reuse a response, it must pass the result of a single request to many \"consumers,\" which are each of the individual calls to bestfetch."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }, "If more than one \"consumer\" tried to read the body, then an error would be thrown. To get around this problem, bestfetch reads the body for you \u2013\xA0one time \u2013 and passes that result to each consumer."));
}

/***/ }),

/***/ 9:
/*!********************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2Fguides%2Ffaq&absolutePagePath=%2FUsers%2Fjames%2Fwebdev%2Fbestfetch%2Fpages%2Fguides%2Ffaq.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2Fguides%2Ffaq&absolutePagePath=%2FUsers%2Fjames%2Fwebdev%2Fbestfetch%2Fpages%2Fguides%2Ffaq.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fguides%2Ffaq&absolutePagePath=%2FUsers%2Fjames%2Fwebdev%2Fbestfetch%2Fpages%2Fguides%2Ffaq.js!./");


/***/ }),

/***/ "dll-reference dll_2adc2403d89adc16ead0":
/*!*******************************************!*\
  !*** external "dll_2adc2403d89adc16ead0" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_2adc2403d89adc16ead0;

/***/ })

},[[9,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=faq.js.map