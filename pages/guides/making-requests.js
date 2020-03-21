import Link from 'next/link';

export default () => {
  return (
    <div className="page">
      <h1>Making Requests</h1>
      <p>
        This guide will cover how to configure requests as well as how to handle
        the responses that you receive.
      </p>
      <p>
        To begin, import the <code>bestfetch</code> function:
      </p>
      <code className="codeBlock">
        {`import { bestfetch } from 'bestfetch';`}
      </code>
      <h2>Configuring Requests</h2>
      <p>
        <code>bestfetch</code> supports all of the same options as{' '}
        <code>fetch</code>.
      </p>
      <h3>Specifying the URL</h3>
      <p>
        You can pass a URL as the first argument, or you can pass an{' '}
        <code>options</code> object and specify the URL there. URLs can be both
        absolute or relative.
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(handleResponse);

bestfetch({
  url: '/api/books/2'
})
  .then(handleResponse);`}
      </code>
      <p>
        Similarly to <code>fetch()</code>, you may also use <code>uri</code>{' '}
        instead of <code>url</code> in the options.
      </p>
      <h3>Specifying the Method</h3>
      <p>
        Pass the <code>method</code> option. For instance, to make a{' '}
        <code>POST</code> request:
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'post'
})
  .then(handleResponse);`}
      </code>
      <p>
        The <code>method</code> option is case-insensitive.
      </p>
      <h3>Sending Data in the Request Body</h3>
      <p>
        Use the <code>body</code> option to send data to the server. To do this,
        stringify your data and pass the correct headers so that the server
        knows how to interpret the data:
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'post',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(handleResponse);`}
      </code>
      <h3>Sending Query Parameters</h3>
      <p>
        Include query parameters in the <code>url</code>.
      </p>
      <code className="codeBlock">
        {`bestfetch('/api/books/2?sort=author')
  .then(handleResponse);`}
      </code>
      <p>
        You may find it preferable to use a library that stringifies query
        parameters from an object. The following example shows how you can use{' '}
        <code>bestfetch</code> with{' '}
        <a href="https://github.com/sindresorhus/query-string">
          <code>query-string</code>
        </a>
        :
      </p>
      <code className="codeBlock">
        {`import queryString from 'query-string';

const qs = queryString.stringify({ sort: 'author' });

bestfetch(\`/api/books/2?\${qs}\`)
  .then(handleResponse);`}
      </code>
      <h3>Configuring the Caching Behavior</h3>
      <p>
        <code>bestfetch</code> will intelligently cache your responses to reduce
        network requests. Refer to the guide on{' '}
        <Link href="/guides/caching-responses">
          <a>Caching Responses</a>
        </Link>{' '}
        to learn how to configure this behavior.
      </p>
      <h3>Other Options</h3>
      <p>
        <code>bestfetch</code> supports all of the same options as{' '}
        <code>fetch</code>, including:
      </p>
      <ul>
        <li>
          <code>method</code>
        </li>
        <li>
          <code>headers</code>
        </li>
        <li>
          <code>body</code>
        </li>
        <li>
          <code>mode</code>
        </li>
        <li>
          <code>credentials</code>
        </li>
        <li>
          <code>cache</code>{' '}
          <i>
            (note: this is not unrelated to the caching system of bestfetch)
          </i>
        </li>
        <li>
          <code>redirect</code>
        </li>
        <li>
          <code>referrer</code>
        </li>
        <li>
          <code>referrerPolicy</code>
        </li>
        <li>
          <code>integrity</code>
        </li>
        <li>
          <code>keepalive</code>
        </li>
        <li>
          <code>signal</code>
        </li>
      </ul>
      <p>
        So far, this guide has covered the most commonly-used options. For more
        information on the other options, refer to{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">
          the <code>fetch()</code> documentation
        </a>{' '}
        on MDN.
      </p>
      <h2>Receiving Responses</h2>
      <p>
        <code>bestfetch</code> returns a Promise. This Promise resolves if a
        response from the server is received, or if a cached value exists, and
        it rejects otherwise.
      </p>
      <h3>Successful Respones</h3>
      <p>
        When a response is successful you can access the data from the response
        on <code>res.data</code>.
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got the data', res.data);
  });`}
      </code>
      <h3>Errors</h3>
      <p>
        If the server replies with an error response, then the Promise will
        still resolve. This may be unexpected. If your server utilizes HTTP
        status codes, then you can check for server errors with the following
        code:
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    if (res.ok) {
      console.log('The request was successful');
    } else {
      console.log('The request was unsuccessful.');
    }
  });`}
      </code>
      <p>If no response is received, then the promise will reject.</p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .catch(err => {
    console.log('Another kind of error occurred.', err);
  });`}
      </code>
      <p>
        The Promise will also reject with a{' '}
        <Link href="/api/cachemisserror">
          <a>CacheMissError</a>
        </Link>{' '}
        if the <code>cachePolicy</code> of the request is set to{' '}
        <code>"cache-only"</code> and nothing was found in the cache.
      </p>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  cachePolicy: 'cache-only'
})
  .catch(err => {
    if (typeof err === CacheMissError) {
      console.log('This request did not having a response in the cache.');
    }
  });`}
      </code>
      <h2>Trying It Out</h2>
      <p>
        This webpage has <code>bestfetch</code> available on the window for you
        to use. Go ahead and to try out making requests with{' '}
        <a href="https://jsonplaceholder.typicode.com/">
          the JSON Placeholder API
        </a>
        !
      </p>
      <p>Here are a few examples to get you started.</p>
      <h3>Fetching a Resource</h3>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got the todo', res.data);
  });`}
      </code>
      <h3>Creating a Resource</h3>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'post',
    body: JSON.stringify({
      title: 'My first post',
      body: 'This is a draft post.',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => console.log('Created:', res.data));`}
      </code>
      <h3>Updating a Resource</h3>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'put',
    body: JSON.stringify({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => console.log('Updated:', res.data));`}
      </code>
      <h3>Deleting a Resource</h3>
      <code className="codeBlock">
        {`bestfetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'delete'
})`}
      </code>
      <h3>Other Examples</h3>
      <p>
        Check out{' '}
        <a href="https://jsonplaceholder.typicode.com/guide.html">
          the JSON Placeholder examples
        </a>{' '}
        for more inspiration.
      </p>
    </div>
  );
};
