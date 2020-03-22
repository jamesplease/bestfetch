import Link from '../components/link';

export default function Index() {
  return (
    <div
      className="page"
      style={{
        '--maxAppWidth': '1150px',
      }}>
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
        <div className="heroProps">
          <div className="heroPropContainer">
            <div className="heroEmoji">🏎</div>
            <div className="heroProp">Fast</div>
            <div className="heroDescription">
              Speed up your app <i>considerably</i> by caching responses. Use
              bestfetch to only make network requests when you need to.
            </div>
          </div>
          <div className="heroPropContainer">
            <div className="heroEmoji">🐭</div>
            <div className="heroProp">Small</div>
            <div className="heroDescription">
              bestfetch is tiny but mighty. With its reasonable file size (
              <code>&lt;3kb</code> gzipped) you can feel responsible adding it
              to an existing codebase.
            </div>
          </div>
        </div>
        <div className="heroProps">
          <div className="heroPropContainer">
            <div className="heroEmoji">⚙️</div>
            <div className="heroProp">Flexible</div>
            <div className="heroDescription">
              bestfetch has great defaults that work for many apps. If something
              doesn't work for your use case, change it: bestfetch's flexible
              API keeps you in control.
            </div>
          </div>
          <div className="heroPropContainer">
            <div className="heroEmoji">⚡️</div>
            <div className="heroProp">Efficient</div>
            <div className="heroDescription">
              bestfetch is great for your users, too: many people worldwide
              browse the web on mobile phones with limited data plans. Use less
              of their data by leveraging bestfetch.
            </div>
          </div>
        </div>
        <Link href="/getting-started">
          <a className="getStartedLink">Get Started</a>
        </Link>
      </div>
    </div>
  );
}
