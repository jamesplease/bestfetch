webpackHotUpdate("static/development/pages/api-reference/cache-miss-error.js",{

/***/ "./pages/api-reference/cache-miss-error.js":
/*!*************************************************!*\
  !*** ./pages/api-reference/cache-miss-error.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_lowlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-lowlight */ "./node_modules/react-lowlight/src/Lowlight.js");
/* harmony import */ var react_lowlight__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_lowlight__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/link */ "./components/link.js");
var _this = undefined,
    _jsxFileName = "/Users/james/webdev/bestfetch/pages/api-reference/cache-miss-error.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __jsx("div", {
    className: "page",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }, "CacheMissError")), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, "An", ' ', __jsx("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, "Error"), ' ', "that represents a cache miss."), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "import { CacheMissError } from 'bestfetch';",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }, "One of the options that you can pass to", ' ', __jsx(_components_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: "/api-reference/bestfetch",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, __jsx("a", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 11
    }
  }, __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }, "bestfetch"))), ' ', "is ", __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 12
    }
  }, "cachePolicy"), ". If you specify your policy to be", ' ', __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  }, "\"cache-only\""), " and no response exists in the cache, then the Promise will reject."), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }, "The error that is passed to the ", __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 41
    }
  }, ".catch()"), " callback will be an instance of ", __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 24
    }
  }, "CacheMissError"), "."), __jsx("h2", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }, "Example Usage"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, "You can use the ", __jsx("code", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 25
    }
  }, "CacheMissError"), " to determine if a cache miss is the cause of the Promise's rejection."), __jsx("div", {
    className: "advanced",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }, __jsx("span", {
    className: "emoji",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, "\uD83D\uDC81\u200D\u2640\uFE0F"), " ", __jsx("b", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 46
    }
  }, "Heads up!"), " You can copy and paste the following code snippet into your browser's developer tools to try it out!"), __jsx(react_lowlight__WEBPACK_IMPORTED_MODULE_1___default.a, {
    language: "js",
    inline: false,
    value: "bestfetch('https://jsonplaceholder.typicode.com/todos/1', {\n  cachePolicy: 'cache-only'\n})\n  .catch(err => {\n    if (err instanceof CacheMissError) {\n      console.log('This request did not have a response in the cache.');\n    }\n  });",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }));
});

/***/ })

})
//# sourceMappingURL=cache-miss-error.js.39ebd594f75d494ec722.hot-update.js.map