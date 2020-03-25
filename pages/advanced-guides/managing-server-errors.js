import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>Managing Server Errors</h1>
      <p>
        Sometimes, servers experience problems that prevent them from returning
        the data that you request. Instead, you might get a response that tells
        you that the server is down. For RESTful APIs, an{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">
          HTTP response status code
        </a>{' '}
        that's <code>>=500</code> indicates that the server had an error when
        processing the request.
      </p>
      <p>
        For most apps, it's best to <i>avoid</i> caching error responses, as the
        server may be up by the time the request is made again.
      </p>
      <p>
        <i>
          Note: for apps with many concurrent users, you may want to slow down
          how often you make requests to a server that is having issues to avoid
          worsening the situation. This library's opinion is that this limiting
          requests to the server should be handled independently from the cache.
        </i>
      </p>
      <p>
        For this reason, <code>bestfetch</code> will not cache responses that
        have an HTTP status code <code>>=500</code>. This will <i>override</i>{' '}
        whatever your <code>cachePolicy</code> is set as.
      </p>
      <p>
        A response that <i>will</i> be added to the cache is called a{' '}
        <b>cacheable response</b>. If the default definition of a cacheable
        response does not work for your application, then you can define it
        yourself.
      </p>
      <h2>Defining Cacheable Responses</h2>
      <p>
        Use <code>responseCache.defineCacheableResponse</code> to define what a
        cacheable response is. You should only call this method one time: when
        your app first loads.
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
        <code>responseCache.defineCacheableResponse()</code> accepts a single
        argument: a function.
      </p>
      <p>
        When you specify a <code>cachePolicy</code> that allows for responses to
        be written to the cache, then the function that you pass into{' '}
        <code>defineCacheableResponse</code> will be called once the response is
        received. The function is passed the <code>response</code> object, and
        if it returns <code>true</code> then the <code>response</code> will be
        added to the cache.
      </p>
      <p>Here's what it looks like to define a cacheable response:</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

// Call this method a single time: before your app mounts.
responseCache.defineCacheableResponse((response) => /* return true or false */);`}
      />
      <p>The default cacheable response definition is:</p>
      <Lowlight
        language="js"
        inline={false}
        value={`(response) => {
  if (response.status >= 500) {
    return false;
  } else {
    return true;
  }
};`}
      />
      <h2>Example: Exclude Nothing</h2>
      <p>
        If you do not wish to exclude <i>any</i> kinds of responses from the
        cache, then you can use the following definition:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.defineCacheableResponse((response) => true);`}
      />
      <p>
        Every server can have problems, though, so be mindful of how this
        library will behave when you use this definition.
      </p>
      <h2>
        Example: Using <code>response.data</code>
      </h2>
      <p>
        Not every API uses HTTP status codes. For instance, some enterprise APIs
        will not return correct response status codes, and their endpoints may
        return <code>200 OK</code> even when the server has an internal error.
        In situations like these, you may wish to look at{' '}
        <code>response.data</code> to see what's in the <code>body</code> of the
        response.
      </p>
      <p>
        In the following example, bestfetch won't cache responses if the value
        of <code>response.data.error</code> is the string{' '}
        <code>"Server error"</code>.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';

responseCache.defineCacheableResponse((response) => {
  if (response.data?.error === 'Server error') {
    return false;
  } else {
    return true;
  }
});`}
      />
    </div>
  );
};
