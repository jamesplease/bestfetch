import Lowlight from 'react-lowlight';
import Link from 'next/link';
import styles from './caching-responses.module.css';

export default function CachingResponses() {
  return (
    <div className="page">
      <h1>Caching Responses</h1>
      <p>bestfetch includes a sophisticated system for caching responses.</p>
      <h2>Configuring the Caching Behavior</h2>
      <p>
        Use the <code>cachePolicy</code> option when calling{' '}
        <code>bestfetch()</code> to control when the cache is used. Supported
        values are:
      </p>
      <ul>
        <li>
          <code>"cache-first"</code>: Requests will first look at the cache to
          see if a response for the same request key exists. If a response is
          found, then it will be returned, and no network request will be made.
          If no response exists in the cache, then a network request will be
          made.
        </li>
        <li>
          <code>"network-only"</code>: The cache is ignored, and a network
          request is always made.
        </li>
        <li>
          <code>"cache-only"</code>: If a response exists in the cache, then it
          will be returned. If no response exists in the cache, then the Promise
          will reject to a{' '}
          <Link href="/api/cachemisserror">
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
    </div>
  );
}
