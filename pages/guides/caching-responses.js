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
        Use the <code>cachePolicy</code> option when calling{' '}
        <code>bestfetch()</code> to configure the behavior of the cache.
        Supported values are:
      </p>
      <ul>
        <li>
          <code>"cache-first"</code>: The cache is checked to see if a response
          already exists for the request. If a response is found, then it will
          be returned, and no network request will be made. If no response
          exists in the cache, then a network request will be made and the
          response will be saved to the cache.
        </li>
        <li>
          <code>"reload"</code>: A network request is always made (even if there
          is a response in the cache). The response is saved to the cache.
        </li>
        <li>
          <code>"cache-only"</code>: If a response exists in the cache, then it
          will be returned. If no response exists in the cache, then the Promise
          will reject to a{' '}
          <Link href="/api-reference/cache-miss-error">
            <a>CacheMissError</a>
          </Link>
          . A network request is <i>never</i> made when using this option.
        </li>
        <li>
          <code>"no-cache"</code>: The cache is ignored completely. A network
          request is always made, and the response is not saved to the cache.
        </li>
      </ul>
      <p>
        The following example shows making a request with a{' '}
        <code>cachePolicy</code> set to <code>"reload"</code>:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books/2', { cachePolicy: 'reload' })
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
          <code>"no-cache"</code>
        </div>
        <div>
          <code>PUT</code>
        </div>
        <div>
          <code>"no-cache"</code>
        </div>
        <div>
          <code>PATCH</code>
        </div>
        <div>
          <code>"no-cache"</code>
        </div>
        <div>
          <code>DELETE</code>
        </div>
        <div>
          <code>"no-cache"</code>
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
      <h2>Cache Freshness</h2>
      <p>
        The cache only returns responses that are <b>fresh</b>. By default,
        every request that is added to the cache remains fresh indefinitely, but
        you can configure this.
      </p>
      <p>
        Refer to the{' '}
        <Link href="/guides/cache-freshness">
          <a>Cache Freshness</a>
        </Link>{' '}
        guide to learn how.
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
      <h2>Advanced: Understanding Identical Requests</h2>
      <p>
        This system of caching is able to work because this library has an
        algorithm to determine when two requests are considered <i>identical</i>
        . For nearly all apps, this algorithm works fine, and you do not need to
        understand how it works.
      </p>
      <p>
        However, if you are interested in understanding it, check out the{' '}
        <Link href="/guides/identical-requests">
          <a>Identical Requests</a>
        </Link>{' '}
        guide.
      </p>
    </div>
  );
}
