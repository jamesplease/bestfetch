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
/* harmony import */ var _components_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/link */ "./components/link.js");
var _jsxFileName = "/Users/james/webdev/bestfetch/pages/guides/deduplicating-requests.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function DeduplicatingRequests() {
  return __jsx("div", {
    className: "page",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, "Deduplicating Requests"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, "bestfetch automatically prevents multiple identical requests from being made at the same time. It will batch all identical requests into a single request and then reuse the response."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }, "This is best understood with an example. Consider the following fetch code:"), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\nfetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, "This code makes two requests to the same exact endpoint, and, accordingly, two network requests are made. You can verify this by running those code snippets in your browser's developer tools."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, "However, these requests are targeting the same exact endpoint, so it would be more efficient to make just one network request. Run the following code in your browser's developer tools to see that only a single request is made:"), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => {\n    console.log('Received the book:', res);\n  });\n\n// This request will \"piggy-back\" on the previous one;\n// a new network request is not made.\nbestfetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }, "When is This Useful?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }
  }, "The example code provided above may seem contrived. When would you ever make two requests back-to-back?"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }
  }, "Consider an application that lets a user choose their country, where the list of countries is pulled from an API. You might choose to create a dropdown component that manages fetching its own list of countries."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }, "If you only have one of these dropdowns on the page at a time, then you should have no problems. But if you were to render two of these dropdowns at the same time, then they would each would make a request to fetch the same list of countries."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 7
    }
  }, "One solution to avoid this inefficiency is hoist the call to fetch the countries outside of the dropdown, and then pass the response into the components. Sometimes, this solution is what is most appropriate."), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }
  }, "Other times, you may not wish to, or you may be unable to, move the network call. Using bestfetch allows you to keep the network call in the component without worrying about how many instances of the component are on the page at one time."), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }
  }, "Disabling Deduplication"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }
  }, "Pass ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 14
    }
  }, "dedupe: false"), " when calling ", __jsx("code", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 54
    }
  }, "bestfetch"), " to disable request deduplication for a particular request."), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('/api/books/2', { dedupe: false })\n  .then(res => {\n    console.log('Received the book:', res);\n  });",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 7
    }
  }, "Learn More"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 7
    }
  }, "To learn more about how this algorithm works, and also how you can change its behavior, check out the", ' ', __jsx(_components_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: "/guides/identical-requests",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, __jsx("a", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 11
    }
  }, "Identical Requests")), ' ', "guide."));
}

/***/ })

})
//# sourceMappingURL=deduplicating-requests.js.9563ce5724d321550a3f.hot-update.js.map