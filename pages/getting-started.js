import Link from 'next/link';

export default function GettingStarted() {
  return (
    <div className="page">
      <h1>Getting Started</h1>
      <p>
        bestfetch is a lightweight HTTP library that allows you to declaratively
        specify the moments when you want network requests to occur, giving you
        more control over your application's network access.
      </p>
      <h2>Installation</h2>
      <p>
        Install using <a href="https://npmjs.com">npm</a>:
      </p>
      <code className="codeBlock">npm install bestfetch</code>
      <p>
        or <a href="https://yarnpkg.com">yarn</a>:
      </p>
      <code className="codeBlock">yarn add bestfetch</code>
      <h2>Quick Start</h2>
      <p>
        Because <code>bestfetch</code> is such a lightweight wrapper around
        `fetch`, you'll benefit from having knowledge of that API. If you're new
        to fetch, I recommend reading the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
          Using Fetch guide on MDN
        </a>
        . It's a great introduction.
      </p>
      <p>
        The following example demonstrates using bestfetch with the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">
          ES2015 module syntax
        </a>
        .
      </p>

      <code className="codeBlock">
        {`import { bestfetch } from 'bestfetch';

const fetchOptions = {
  method: 'PATCH',
  body: JSON.stringify({ a: 12 })
};

bestfetch('/test/2', fetchOptions)
  .then(res => {
    console.log('Got some data', res.data);
  });

// Additional identical requests are deduped. Nifty.
bestfetch('/test/2', fetchOptions)
  .then(res => {
    console.log('Got some data', res.data);
  });`}
      </code>
    </div>
  );
}
