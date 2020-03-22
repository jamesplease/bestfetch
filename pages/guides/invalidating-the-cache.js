import Lowlight from 'react-lowlight';

export default function CachingResponses() {
  return (
    <div className="page">
      <h1>Invalidating the Cache</h1>
      <p>
        Out of the box, bestfech will never invalidate your cached responses.
        What this means is that a particular request will only ever hit the
        server <b>once</b>, unless you configure bestfetch to behave
        differently.
      </p>
      <p>
        The reason this library works this way is because cache invalidation is
        a difficult problem, and each application has its own particular needs.
        It would be impossible for this library to include a default
        invalidation strategy and expect it to work for every use case in every
        app.
      </p>
      <h2>Defining Your Invalidation Strategy</h2>
      <p>
        You can configure an invalidation strategy that works for your
        application using the <code>responseCache.useCachedResponse()</code>{' '}
        method.
      </p>
      <p>
        You only need to call this method a single time; typically before you
        start your application.
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
        <code>responseCache.useCachedResponse()</code> accepts a single
        argument: a function.
      </p>
      <p>
        It works like this: each time that a request is made that has a cached
        entry, the function that you pass will be called with a single argument:
        a <code>cacheObject</code> (described below). Return <code>true</code>{' '}
        from the function to use the cached response, or <code>false</code> to
        immediately invalidate it.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

// Call this method a single time: before your app mounts.
responseCache.useCachedResponse(() => /* return true or false */);`}
      />
      <h2>
        <code>cacheObject</code>
      </h2>
      <p>
        The function that you pass to <code>useCachedResponse</code> will be
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
      <h2>Example: Invalidating Every Cached Entry</h2>
      <p>
        The simplest example is to define a strategy that rejects <i>every</i>{' '}
        cached entry.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.useCachedResponse(() => false);`}
      />
      <p>
        With this invalidation strategy in place, it is as if this library
        doesn't cache any responses at all. This isn't particularly useful, so
        let's look at more realistic examples.
      </p>
      <h2>Example: Invalidate After 10 Minutes</h2>
      <p>
        In the following example, we reject cached responses that are older than
        10 minutes.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

// 1000 = 1 second in milliseconds
// * 60 = 1 minute
// * 10 = 10 minutes
const TEN_MINUTES = 1000 * 60 * 10;

responseCache.useCachedResponse(cacheObject => {
  const currentTimestamp = Date.now();
  return currentTimestamp - cacheObject.createdAt <= TEN_MINUTES;
});`}
      />
      <h2>Example: Invalidate After 10 Times</h2>
      <p>
        In the following example, we only allow a cached response to be used up
        to 10 times.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.useCachedResponse(cacheObject => {
  return cacheObject.accessCount <= 10;
});`}
      />
    </div>
  );
}
