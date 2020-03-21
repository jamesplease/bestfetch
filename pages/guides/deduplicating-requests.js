import Lowlight from 'react-lowlight';
import Link from 'next/link';

export default function DeduplicatingRequests() {
  return (
    <div className="page">
      <h1>Deduplicating Requests</h1>
      <p>
        bestfetch automatically prevents multiple identical requests from being
        made at the same time. It will batch all identical requests into a
        single request and then reuse the response.
      </p>
      <p>
        This is best understood with an example. Consider the following fetch
        code:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`fetch('/api/books/2')
  .then(res => {
    console.log('Received the book:', res);
  });

fetch('/api/books/2')
  .then(res => {
    console.log('Received the book:', res);
  });`}
      />
      <p>
        This code makes two requests to the same exact endpoint, and,
        accordingly, two network requests are made. Because these requests are
        targeting the same exact endpoint, it would be more efficient to make
        just one network request. That's what bestfetch will do:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books/2')
  .then(res => {
    console.log('Received the book:', res);
  });

// This request will "piggy-back" on the previous one;
// a new network request is not made.
bestfetch('/api/books/2')
  .then(res => {
    console.log('Received the book:', res);
  });`}
      />
      <h2>What Makes a Request Identical?</h2>
      <p>
        This library looks at the following pieces of information about a
        request:
      </p>
      <ul>
        <li>The URL</li>
        <li>The request body</li>
        <li>
          The request method (i.e.; <code>GET</code>)
        </li>
        <li>
          The <code>responseType</code>
        </li>
      </ul>
      <p>
        Requests are only deduped when <b>all</b> of these things are identical
        between two or more requests.
      </p>
      <h2>When is This Useful?</h2>
      <p>
        The example code provided above may seem contrived. When would you ever
        make two requests back-to-back?
      </p>
      <p>
        Consider an application that lets a user choose their country, where the
        list of countries is pulled from an API. You might choose to create a
        dropdown component that manages fetching its own list of countries.
      </p>
      <p>
        If you only have one of these dropdowns on the page at a time, then you
        should have no problems. But if you were to render two of these
        dropdowns at the same time, then they would each would make a request to
        fetch the same list of countries.
      </p>
      <p>
        One solution to avoid this inefficiency is hoist the call to fetch the
        countries outside of the dropdown, and then pass the response into the
        components. Sometimes, this solution is what is most appropriate.
      </p>
      <p>
        Other times, you may not wish to, or you may be unable to, move the
        network call. Using bestfetch allows you to keep the network call in the
        component without worrying about how many instances of the component are
        on the page at one time.
      </p>
      <h2>Disabling Deduplication</h2>
      <p>
        Pass <code>dedupe: false</code> when calling <code>bestfetch</code> to
        disable request deduplication for a particular request.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books/2', { dedupe: false })
  .then(res => {
    console.log('Received the book:', res);
  });`}
      />
      <h2>Configuring the Deduplication Behavior</h2>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> This is an advanced
        API that very few applications should ever need to use. Be careful if
        you decide to use it in your app.
      </div>
      <p>
        In rare situations, you may wish to have control over when two requests
        are considered to be identical. You can do this by specifying a{' '}
        <code>requestKey</code> when calling <code>bestfetch</code>. A{' '}
        <code>requestKey</code> is a string that bestfetch uses to determine
        when two requests are identical.
      </p>
      <p>
        When two requests have the same key, then they are deduped.
        Additionally, the request key is used to determine when to pull from the
        cache.
      </p>
      <p>
        By default, a <code>requestKey</code> is generated for you, but you may
        pass your own to override this behavior.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('/api/books/2', { requestKey: 'my-custom-key' })
  .then(res => {
    console.log('Received the book:', res);
  });`}
      />
    </div>
  );
}
