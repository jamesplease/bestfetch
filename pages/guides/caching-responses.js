import Lowlight from 'react-lowlight';
import styles from './caching-responses.module.css';
import Link from '../../components/link';

export default function CachingResponses() {
  return (
    <div className="page">
      <h1>Caching Responses</h1>
      <p>bestfetch includes a sophisticated system for caching responses.</p>
      <h2>Configuring the Caching Behavior</h2>
      <p>
        <code>bestfetch</code> supports two options that allow you to control
        the behavior of the cache on a per-request basis:
      </p>
      <ul>
        <li>
          <b>
            <code>cachePolicy</code>
          </b>
          : Allows you to control whether to look in the cache before making a
          request. In other words, this controls <i>reading</i> from the cache.
        </li>
        <li>
          <b>
            <code>saveToCache</code>
          </b>
          : This option allows you to specify when responses received from the
          server should be written to the cache or not. This controls{' '}
          <i>writing</i> to the cache.
        </li>
      </ul>
      <p>
        Use the <code>cachePolicy</code> option when calling{' '}
        <code>bestfetch()</code> to control when the cache is used to retrieve
        responses. Supported values are:
      </p>
      <ul>
        <li>
          <code>"cache-first"</code>: The cache is checked to see if a response
          already exists for the request. If a response is found, then it will
          be returned, and no network request will be made. If no response
          exists in the cache, then a network request will be made.
        </li>
        <li>
          <code>"network-only"</code>: The cache is ignored, and a network
          request is always made.
        </li>
        <li>
          <code>"cache-only"</code>: If a response exists in the cache, then it
          will be returned. If no response exists in the cache, then the Promise
          will reject to a{' '}
          <Link href="/api-reference/cache-miss-error">
            <a>CacheMissError</a>
          </Link>
          .
        </li>
      </ul>
      <p>
        The following example shows how to specify the{' '}
        <code>"network-only"</code> option:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books/2', { cachePolicy: 'network-only' })
  .then(res => {
    console.log('Got the book', res.data);
  });`}
      />
      <h2>The Default Behavior</h2>
      <p>
        The default value of <code>cache-policy</code> is determined by the
        methed of the request:
      </p>
      <div className={styles.grid}>
        <div className={styles.gridTitle}>Method</div>
        <div className={styles.gridTitle}>
          <code>cachePolicy</code>
        </div>
        <div>
          <code>GET</code>
        </div>
        <div>
          <code>"cache-first"</code>
        </div>
        <div>
          <code>POST</code>
        </div>
        <div>
          <code>"network-only"</code>
        </div>
        <div>
          <code>PUT</code>
        </div>
        <div>
          <code>"network-only"</code>
        </div>
        <div>
          <code>PATCH</code>
        </div>
        <div>
          <code>"network-only"</code>
        </div>
        <div>
          <code>DELETE</code>
        </div>
        <div>
          <code>"network-only"</code>
        </div>
      </div>
      <p>The default value for less commonly used methods is:</p>
      <div className={styles.grid}>
        <div className={styles.gridTitle}>Method</div>
        <div className={styles.gridTitle}>
          <code>cachePolicy</code>
        </div>
        <div>
          <code>HEAD</code>
        </div>
        <div>
          <code>"cache-first"</code>
        </div>
        <div>
          <code>OPTIONS</code>
        </div>
        <div>
          <code>"cache-first"</code>
        </div>
      </div>
      <h2>When to Change This Behavior</h2>
      <p>
        The default behavior is designed to work for traditional "RESTful" APIs.
        There are a couple of common situations where this default will not
        work, and where you will need to specify <code>cachePolicy</code>{' '}
        yourself:
      </p>
      <ul>
        <li>
          <b>GraphQL</b>: many GraphQL implementations use <code>POST</code> for
          all requests (queries and for mutations).
        </li>
        <li>
          <b>REST APIs</b>: Sometimes, APIs will use <code>POST</code> for
          retrieving data instead of <code>GET</code>.
        </li>
      </ul>
      <h2>Cache Invalidation</h2>
      <p>
        Responses that are added to the cache are <b>never</b> invalidated
        unless you configure how you would like for them to be invalidated. For
        more, refer to the guide on{' '}
        <Link href="/guides/invalidating-the-cache">
          <a>invalidating cached responses</a>
        </Link>
        .
      </p>
      <h2>Completely Disabling the Cache</h2>
      <p>
        You can set <code>cachePolicy</code> to <code>"network-only"</code> and{' '}
        <code>saveToCache</code> to <code>false</code> to disable all of the
        features of bestfetch that are related to the cache.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  cachePolicy: 'network-only',
  saveToCache: false
})
  .then(handleResponse);`}
      />
      <p>
        Keep in mind that if a particular request doesn't need the caching
        features of <code>bestfetch</code>, then you might consider using{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">
          <code>fetch</code>
        </a>{' '}
        for that request instead.
      </p>
      <h2>Directly Accessing the Cache</h2>
      <p>
        There may come a time when you need to directly read or write to the
        response cache. You can use the <code>responseCache</code> export from
        this library to do this. Learn more in the{' '}
        <Link href="/api-reference/response-cache">
          <a>
            API documentation for <code>responseCache</code>
          </a>
        </Link>
        .
      </p>
      <h2>Learn More</h2>
      <p>
        To learn more about how this algorithm works, and also how you can
        change its behavior, check out the{' '}
        <Link href="/guides/identical-requests">
          <a>Identical Requests</a>
        </Link>{' '}
        guide.
      </p>
    </div>
  );
}
