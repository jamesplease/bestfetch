# Fetch Dedupe

A thin wrapper around `fetch` that prevents duplicate requests.

### Motivation

A common feature of modern web frameworks is that they deduplicate HTTP requests that
are exactly the same.

Deduping requests is a useful feature that makes a lot of sense as a standalone lib. And
that's why I made Fetch Dedupe.

Fetch Dedupe is a very thin wrapper around
[`global.fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
that makes it so your requests are deduped. Nifty.

### Installation

Install using [npm](https://www.npmjs.com):

```
npm install fetch-dedupe
```

or [yarn](https://yarnpkg.com/):

```
yarn add fetch-dedupe
```

### Getting Started

Coming soon.

### API

##### `fetchDedupe`

Coming soon.