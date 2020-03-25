import Lowlight from 'react-lowlight';
import Link from '../../components/link';

export default function DeduplicatingRequests() {
  return (
    <div className="page">
      <h1>Identical Requests</h1>
      <p>
        bestfetch's{' '}
        <Link href="/guides/deduplicating-requests">
          <a>request deduplication</a>
        </Link>{' '}
        and{' '}
        <Link href="/guides/caching-responses">
          <a>response caching</a>
        </Link>{' '}
        features work by determining which requests are <b>identical</b>. This
        guide explains when requests are identical, and it also covers how you
        can change this behavior.
      </p>
      <h2>Determining Identical Requests</h2>
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
        bestfetch combines these pieces of information into a string called a{' '}
        <code>requestKey</code>. Requests with the same <code>requestKey</code>{' '}
        are identical.
      </p>
      <p>
        This algorithm is exported from this library as{' '}
        <Link href="/api-reference/get-request-key">
          <a>
            <code>getRequestKey</code>
          </a>
        </Link>
        .
      </p>
      <h2>
        Specifying a <code>requestKey</code>
      </h2>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> This is an advanced
        API that few applications should ever need to use.
      </div>
      <p>
        In rare situations, you may wish to have control over when two requests
        are considered to be identical. You can do this by specifying the{' '}
        <code>requestKey</code> when calling <code>bestfetch</code>.
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
      <p>
        Be careful when specifying your own request keys – it will affect the
        behavior of both request deduplication and response caching!
      </p>
    </div>
  );
}
