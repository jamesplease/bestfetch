import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>Cache Freshness</h1>
      <p>
        The cache will only return responses that are <b>fresh</b>. Out of the
        box, responses that are added to the cache stay fresh indefinitely.
        However, you can and often should configure this differently for your
        application.
      </p>
      <p>
        For example, you may wish to specify that responses should only remain
        fresh for a certain period of time, such as 10 minutes. This guide will
        explain how you can configure when responses go stale for your app.
      </p>

      <h2>Defining Staleness</h2>
      <p>
        Use the <code>responseCache.defineStaleness()</code> method to specify
        when responses go stale. You only need to call this method a single
        time; typically before you start your application.
      </p>
      <p>
        To get started, import the <code>responseCache</code> object:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';`}
      />
      <p>
        <code>responseCache.defineStaleness()</code> accepts a single argument:
        a function.
      </p>
      <p>
        It works like this: each time that a request is made that has a cached
        response, the function that you pass into <code>defineStaleness</code>{' '}
        will be called with a single argument: a <code>cacheObject</code>{' '}
        (described below). Return <code>true</code> if the value is stale, or{' '}
        <code>false</code> if it is false.
      </p>
      <p>
        To put this another way, the freshness of a response in the cache is
        determined <i>lazily</i>.
      </p>
      <p>Here's what it looks like to specify a definition for staleness:</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

// Call this method a single time: before your app mounts.
responseCache.defineStaleness((cacheObject) => /* return true or false */);`}
      />
      <p>The default definition of staleness is:</p>
      <Lowlight
        language="js"
        inline={false}
        value={`(cacheObject) => false;`}
      />
      <p>
        which means that any response that is added to the cache is <i>never</i>{' '}
        stale – they remain fresh indefinitely.
      </p>
      <h2>
        <code>cacheObject</code>
      </h2>
      <p>
        The function that you pass to <code>defineStaleness</code> will be
        passed a single argument: <code>cacheObject</code>. You can use this
        object to decide whether or not to use the cached reponse or not.
      </p>
      <p>
        A <code>cacheObject</code> has the following shape:
      </p>
      <ul>
        <li>
          <code>createdAt</code>: A timestamp (in milliseconds) when the
          response was added to the cache.
        </li>
        <li>
          <code>lastAccessedAt</code>: A timecode (in milliseconds) when this
          response was last read from the cache.
        </li>
        <li>
          <code>accessCount</code>: How many times the response has been read
          from the cache.
        </li>
        <li>
          <code>res</code>: The cached response.
        </li>
      </ul>
      <h2>Example: Immediately Stale</h2>
      <p>
        The simplest example is to define a strategy that considers every
        response as stale.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.defineStaleness((cacheObject) => true);`}
      />
      <p>
        With this definition, every response is immediately stale, so nothing
        will ever be returned from the cache when making requests. This isn't
        particularly useful, so let's look at more realistic examples.
      </p>
      <h2>Example: Stale After 10 Minutes</h2>
      <p>In the following example, responses go stale after 10 minutes.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

// 1000 = 1 second in milliseconds
// * 60 = 1 minute
// * 10 = 10 minutes
const TEN_MINUTES = 1000 * 60 * 10;

responseCache.defineStaleness((cacheObject) => {
  const currentTimestamp = Date.now();
  return currentTimestamp - cacheObject.createdAt > TEN_MINUTES;
});`}
      />
      <h2>Example: Stale After 10 Requests</h2>
      <p>
        In the following example, responses go stale once they have been used
        for 10 requests.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.defineStaleness((cacheObject) => {
  return cacheObject.accessCount >= 10;
});`}
      />
      <h2>Cache Eviction</h2>
      <p>
        Deleting a stale value from the cache is called <i>eviction</i>. When a
        request is made, and its cached response is determined to be stale, that
        response is immediately evicted from the cache.
      </p>
    </div>
  );
};
