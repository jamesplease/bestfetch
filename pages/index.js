import Link from 'next/link';

export default function Index() {
  return (
    <div className="page">
      <div className="hero">
        <h1 className="indexTitle">bestfetch</h1>
        <div className="badgeList">
          <a href="https://travis-ci.org/jamesplease/bestfetch">
            <img
              src="http://img.shields.io/travis/jamesplease/bestfetch.svg?style=flat"
              alt="Travis build status"
            />
          </a>
          <a href="https://www.npmjs.com/package/bestfetch">
            <img
              src="https://img.shields.io/npm/v/bestfetch.svg"
              alt="npm version"
            />
          </a>
          <a href="https://coveralls.io/github/jamesplease/bestfetch?branch=master">
            <img
              src="https://coveralls.io/repos/github/jamesplease/bestfetch/badge.svg?branch=master"
              alt="Test Coverage"
            />
          </a>
          <a href="https://unpkg.com/bestfetch/lib/index.js">
            <img
              src="http://img.badgesize.io/https://unpkg.com/bestfetch/lib/index.js?compression=gzip"
              alt="gzip size"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
