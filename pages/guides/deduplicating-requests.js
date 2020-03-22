import Lowlight from 'react-lowlight';
import Link from '../../components/link';

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
        value={`fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json())
  .then(data => {
    console.log('First request received the todo:', data);
  });

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json())
  .then(data => {
    console.log('Second request received the todo:', data);
  });`}
      />
      <p>
        This code makes two requests to the same exact endpoint, and,
        accordingly, two network requests are made. You can verify this by
        running those code snippets in your browser's developer tools.
      </p>
      <p>
        However, these requests are targeting the same exact endpoint, so it
        would be more efficient to make just one network request. Run the
        following code in your browser's developer tools to see that only a
        single request is made:
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('First request received the todo:', res.data);
  });

// This request will "piggy-back" on the previous one;
// a new network request is not made.
bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Second request received the todo:', res.data);
  });`}
      />
      <h2>When is This Useful?</h2>
      <p>
        The example code provided above may seem contrived. When would you ever
        make two requests back-to-back?
      </p>
      <p>
        Consider an application that lets a user choose their country, where the
        list of countries is pulled from an API. You might choose to create a
        dropdown component that is responsible for fetching its own list of
        countries.
      </p>
      <p>
        If you only have one of these dropdowns on the page at a time, then
        there is no issue. But if you were to render two of these dropdowns at
        the same time, then they would each would make a request to fetch the
        same list of countries, which is inefficient.
      </p>
      <p>
        One solution to this problem is to hoist the call to fetch the countries
        outside of the dropdown, and then pass the data into the components.
        Sometimes, this solution is appropriate.
      </p>
      <p>
        Other times, you may not wish to, or you may be unable to, move the HTTP
        request. Using bestfetch allows you to keep the request in the component
        without worrying about how many instances of the component are on the
        page at one time.
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
