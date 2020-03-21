import Link from 'next/link';

export default function CachingResponses() {
  return (
    <div className="page">
      <h1>Caching Responses</h1>
      <p>
        bestfetch includes a sophisticated system for caching responses. This
        allows you to more easily write applications that are as network
        efficient as they can be.
      </p>
      <h2>Configuring the Caching Behavior</h2>
      <p>
        The default behavior of bestfetch is that the cache will be checked
        first. If a response exists, then it will be used. If a response does
        not exist in the cache, then a network request will be made.
      </p>
      <p>
        To change this behavior, you can use <code>cachePolicy</code> option
        when calling <code>bestfetch()</code>. The value of the default behavior
        is called <code>"cache-first"</code>, but there are two other options.
        The full list of values are:
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
      <h2>Cache Invalidation</h2>
      <p>
        Responses that are added to the cache are never invalidated unless you
        configure how you would like for them to be invalidated. For more, refer
        to the guide on{' '}
        <Link href="/guides/invalidating-the-cache">
          <a>invalidating cached responses</a>
        </Link>
        .
      </p>
    </div>
  );
}
