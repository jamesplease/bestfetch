import Lowlight from 'react-lowlight';
import Link from '../../components/link';

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
      <Lowlight
        language="js"
        inline={false}
        value={`import { bestfetch } from 'bestfetch';`}
      />
      <h2>Configuring Requests</h2>
      <p>
        <code>bestfetch</code> supports all of the same options as{' '}
        <code>fetch</code>.
      </p>
      <p>
        In fact, because bestfetch is a lightweight wrapper around fetch, it can
        be beneficial for you to be familiar with that API. If you're new to
        fetch, you may wish to read the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
          Using Fetch guide on MDN
        </a>
        .
      </p>
      <h3>Specifying the URL</h3>
      <p>
        You can pass a URL as the first argument, or you can pass an{' '}
        <code>options</code> object and specify the URL there. URLs can be both
        absolute or relative.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(handleResponse);

bestfetch({
  url: '/api/books/2'
})
  .then(handleResponse);`}
      />
      <h3>Specifying the HTTP Method</h3>
      <p>
        Pass the <code>method</code> option. For instance, to make a{' '}
        <code>POST</code> request:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'post'
})
  .then(handleResponse);`}
      />
      <p>
        The <code>method</code> option is case-insensitive, so either{' '}
        <code>"POST"</code> and <code>"post"</code> will work.
      </p>
      <h3>Sending Data in the Request Body</h3>
      <p>
        Use the <code>body</code> option to send data to the server. To do this,
        stringify your data and pass the correct headers so that the server
        knows how to parse the data:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'post',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(handleResponse);`}
      />
      <h3>Sending Query Parameters</h3>
      <p>
        Include query parameters in the <code>url</code>.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books?sort=author')
  .then(handleResponse);`}
      />
      <p>
        You may find it preferable to use a library that stringifies query
        parameters from an object. The following example shows how you can use{' '}
        <code>bestfetch</code> with{' '}
        <a href="https://github.com/sindresorhus/query-string">
          <code>query-string</code>
        </a>
        :
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import queryString from 'query-string';

const qs = queryString.stringify({ sort: 'author' });

bestfetch(\`/api/books?\${qs}\`)
  .then(handleResponse);`}
      />
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
        information on these other options, refer to{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">
          the <code>fetch()</code> documentation
        </a>{' '}
        on MDN.
      </p>
      <p>
        In addition to the options that come from <code>fetch</code>, there are
        additional options introduced in bestfetch. These are used for the
        caching and deduplication features.
      </p>
      <ul>
        <li>
          <code>cachePolicy</code>: Controls the caching behavior. Learn more in
          the{' '}
          <Link href="/guides/caching-responses">
            <a>caching guide</a>
          </Link>
          .
        </li>
        <li>
          <code>dedupe</code>: Whether or not to dedupe this request. Learn more
          in the{' '}
          <Link href="/guides/deduplicating-requests">
            <a>deduplication guide</a>
          </Link>
          .
        </li>
        <li>
          <code>responseType</code>. Use this option when making requests to
          endpoints that do not return JSON. Learn more{' '}
          <Link href="/guides/other-response-types">
            <a>here</a>
          </Link>
          .
        </li>
        <li>
          <code>requestKey</code>. An advanced option that is used to determine
          which requests are identical. You probably won't need this. Learn more
          in the{' '}
          <Link href="/guides/deduplicating-requests">
            <a>deduplication guide</a>
          </Link>
          .
        </li>
      </ul>
      <h2>Receiving Responses</h2>
      <p>
        <code>bestfetch</code> returns a Promise. This Promise resolves if a
        response from the server or cache is received, and it rejects otherwise.
      </p>
      <h3>Successful Respones</h3>
      <p>
        When a response is successful you can access the data from the response
        on <code>res.data</code>.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got the data', res.data);
  });`}
      />
      <h3>Errors</h3>
      <p>
        If the server replies with an error response, then the Promise will
        still resolve. This is important to note, because it may be unexpected.
      </p>
      <p>
        If your server returns HTTP status codes that are greater than or equal
        to 400 when there are errors, then you can check for server errors with
        the following code:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    if (res.ok) {
      console.log('The request was successful');
    } else {
      console.log('The request was unsuccessful.');
    }
  });`}
      />
      <p>If no response is received, then the promise will reject.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .catch(err => {
    console.log('Another kind of error occurred.', err);
  });`}
      />
      <p>
        The Promise will also reject with a{' '}
        <Link href="/api/cachemisserror">
          <a>CacheMissError</a>
        </Link>{' '}
        if the <code>cachePolicy</code> of the request is set to{' '}
        <code>"cache-only"</code> and nothing was found in the cache.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  cachePolicy: 'cache-only'
})
  .catch(err => {
    if (typeof err === CacheMissError) {
      console.log('This request did not having a response in the cache.');
    }
  });`}
      />
      <h2>Trying It Out</h2>
      <p>
        This webpage has <code>bestfetch</code> available on the window for you
        to use. You can try it out by making requests to{' '}
        <a href="https://jsonplaceholder.typicode.com/">
          the JSON Placeholder API
        </a>
        .
      </p>
      <p>Here are a few examples to get you started.</p>
      <h3>Fetching a Resource</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got the todo', res.data);
  });`}
      />
      <h3>Creating a Resource</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/posts', {
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
      />
      <h3>Updating a Resource</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/posts/1', {
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
      />
      <h3>Deleting a Resource</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'delete'
})`}
      />
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
