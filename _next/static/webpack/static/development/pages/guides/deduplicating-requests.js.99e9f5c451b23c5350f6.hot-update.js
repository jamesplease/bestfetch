webpackHotUpdate("static/development/pages/guides/deduplicating-requests.js",{

/***/ "./pages/guides/deduplicating-requests.js":
/*!************************************************!*\
  !*** ./pages/guides/deduplicating-requests.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeduplicatingRequests; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_lowlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-lowlight */ "./node_modules/react-lowlight/src/Lowlight.js");
/* harmony import */ var react_lowlight__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_lowlight__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/james/webdev/bestfetch/pages/guides/deduplicating-requests.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function DeduplicatingRequests() {
  return __jsx("div", {
    className: "page",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }
  }, "Deduplicating Requests"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, "bestfetch automatically prevents multiple identical requests from being made at the same time. It will batch all identical requests into a single request and then reuse the response."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }, "This is best understood with an example. Consider the following fetch code:"), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "fetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\nfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, "This code makes two requests to the same exact endpoint, and, accordingly, two network requests are made. Because these requests are targeting the same exact endpoint, it would be more efficient to make just one network request. That's what bestfetch will do:"), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\n// This request will \"piggy-back\" on the previous one;\n// a new network request is not made.\nbestfetch('/api/books/2')\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, "When is This Useful?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }, "The example code provided above may seem contrived. When would you ever make two requests back-to-back?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }
  }, "Consider an application that lets a user choose their country, where the list of countries is pulled from an API. You might choose to create a dropdown component that manages fetching its own list of countries."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }
  }, "If you only have one of these dropdowns on the page at a time, then you should have no problems. But if you were to render two of these dropdowns at the same time, then they would each would make a request to fetch the same list of countries."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }, "One solution to avoid this inefficiency is hoist the call to fetch the countries outside of the dropdown, and then pass the response into the components. Sometimes, this solution is what is most appropriate."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }
  }, "Other times, you may not wish to, or you may be unable to, move the network call. Using bestfetch allows you to keep the network call in the component without worrying about how many instances of the component are on the page at one time."), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }
  }, "Disabling Deduplication"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }
  }, "Pass ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 14
    }
  }, "dedupe: false"), " when calling ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 54
    }
  }, "bestfetch"), " to disable request deduplication for a particular request."), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('/api/books/2', { dedupe: false })\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }
  }, "Configuring the Deduplication Behavior"), __jsx("div", {
    className: "advanced",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }, __jsx("span", {
    className: "emoji",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }
  }, "\uD83D\uDC81\u200D\u2640\uFE0F"), " ", __jsx("b", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 46
    }
  }, "Heads up!"), " This is an advanced API that very few applications should ever need to use. Be careful if you decide to use it in your app."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 7
    }
  }, "In rare situations, you may wish to have control over when two requests are considered to be identical. You can do this by specifying a", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }
  }, "requestKey"), " when calling ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 46
    }
  }, "bestfetch"), ". A", ' ', __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, "requestKey"), " is a string that bestfetch uses to determine when two requests are identical."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }
  }, "When two requests have the same key, then they are deduped. Additionally, the request key is used to determine when to pull from the cache."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 7
    }
  }, "By default, a ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 23
    }
  }, "requestKey"), " is generated for you, but you may pass your own to override this behavior."), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('/api/books/2', { requestKey: 'my-custom-key' })\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }
  }));
}

/***/ })

})
//# sourceMappingURL=deduplicating-requests.js.99e9f5c451b23c5350f6.hot-update.js.map