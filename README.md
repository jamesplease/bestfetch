# bestfetch

[![Travis build status](http://img.shields.io/travis/jamesplease/bestfetch.svg?style=flat)](https://travis-ci.org/jamesplease/bestfetch)
[![npm version](https://img.shields.io/npm/v/bestfetch.svg)](https://www.npmjs.com/package/bestfetch)
[![Test Coverage](https://coveralls.io/repos/github/jamesplease/bestfetch/badge.svg?branch=master)](https://coveralls.io/github/jamesplease/bestfetch?branch=master)
[![gzip size](http://img.badgesize.io/https://unpkg.com/bestfetch/lib/index.js?compression=gzip)](https://unpkg.com/bestfetch/lib/index.js)

A [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-like HTTP library that
implements request deduplication and response caching.

## Motivation

Making a single HTTP request is not difficult to do in JavaScript. However, complex web applications often make many
requests as the user navigates through the app.

Features such as request deduplication and response caching can often save the developer of apps like these from headache and
bugs.

`bestfetch` is a library with a familiar, fetch-like API, and it includes request deduplication and response caching. Plus,
it's a delight to use.

## Installation

Install using [npm](https://www.npmjs.com):

```
npm install bestfetch
```

or [yarn](https://yarnpkg.com/):

```
yarn add bestfetch
```

## Documentation

View the documentation at [https://jamesplease.github.io/bestfetch/](https://jamesplease.github.io/bestfetch/).

## Acknowledgements

[Apollo](https://www.apollographql.com/) inspired me to write this library.
