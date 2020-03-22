import Link from '../../components/link';

export default function API() {
  return (
    <div className="page">
      <h1>API</h1>
      <p>
        This library has a named export that you will use most often:{' '}
        <code>bestfetch</code>.
      </p>
      <ul>
        <li>
          <Link href="/api-reference/bestfetch">
            <a>bestfetch()</a>
          </Link>
        </li>
      </ul>
      <h2>Other APIs</h2>
      <p>These are the other named exports of this library.</p>
      <ul>
        <li>
          <Link href="/api-reference/response-cache">
            <a>responseCache</a>
          </Link>
        </li>
        <li>
          <Link href="/api-reference/cache-miss-error">
            <a>CacheMissError</a>
          </Link>
        </li>
        <li>
          <Link href="/api-reference/active-requests">
            <a>activeRequests</a>
          </Link>
        </li>
        <li>
          <Link href="/api-reference/get-request-key">
            <a>getRequestKey()</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
