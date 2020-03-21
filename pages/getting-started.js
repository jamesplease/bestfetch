import Lowlight from 'react-lowlight';
import Link from 'next/link';

export default function GettingStarted() {
  return (
    <div className="page">
      <h1>Getting Started</h1>
      <p>
        bestfetch is a lightweight HTTP request library that improves your
        application's performance by minimizing the number of requests that go
        over the network.
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
      <h2>Basic Usage</h2>
      <p>
        Get started by importing the <code>bestfetch</code> function. The
        following example demonstrates importing it using the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">
          ES2015 module syntax
        </a>
        .
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { bestfetch } from 'bestfetch';`}
      />
      <p>
        Use this function to make requests. In the following example, a request
        is made to fetch a todo item from an API.
      </p>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> You can copy and
        paste the following code snippet into your browser's developer tools to
        try it out!
      </div>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got some data', res.data);
  });`}
      />
      <p>
        If you copy the above code you can run it your browser's developer
        tools. Run it several times and you'll see that only a single network
        request is made; subsequent requests hit the cache and resolve
        immediately.
      </p>
      <p>
        If you're familiar with <code>fetch</code>, you may have noticed that
        we're not calling <code>.json()</code>
        on the response. Typical <code>fetch</code> usage would look like the
        following:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json())
  .then(data => {
    console.log('Got some data', data);
  });`}
      />
      <p>
        When you call <code>.json()</code> you're reading the response body from
        the server and parsing it as JSON. When you use bestfetch, the request
        body is read and parsed as JSON automatically for you (although this{' '}
        <Link href="/guides/other-response-types">
          <a>can be configured</a>
        </Link>
        ).
      </p>
      <h2>Next Steps</h2>
      <p>
        Now that you've seen the basic usage of bestfetch, read the{' '}
        <Link href="/guides/making-requests">
          <a>Making Requests</a>
        </Link>{' '}
        guide to learn more.
      </p>
    </div>
  );
}
