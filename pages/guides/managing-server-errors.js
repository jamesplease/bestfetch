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
        For this reason, <code>bestfetch</code> will not cache responses that
        have an HTTP status code <code>>=500</code>. They will not be cached no
        matter what you specify your <code>cachePolicy</code> to be.
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
        Every server can have problems, though, so just be mindful of how this
        library will behave when you specify the definition to be like this.
      </p>
      <h2>
        Example: Using <code>response.data</code>
      </h2>
      <p>
        Not every API uses HTTP status codes. For instance, some GraphQL
        implementations return <code>200 OK</code> no matter what happens. In
        situations like these, you may wish to look at{' '}
        <code>response.data</code> to see what's in the <code>body</code> of the
        response.
      </p>
      <p>
        In the following example, we won't cache responses if the value of{' '}
        <code>response.data.error</code> is the string{' '}
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
