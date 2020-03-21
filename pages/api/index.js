import Link from 'next/link';

export default function API() {
  return (
    <div className="page">
      <h1>API</h1>
      <p>
        This library has a named export that you will use most often: bestfetch.
        Most of the time it is all that you will need.
      </p>
      <ul>
        <li>
          <Link href="/api/bestfetch">
            <a>bestfetch()</a>
          </Link>
        </li>
      </ul>
      <h2>Other APIs</h2>
      <p>The following named exports are less commonly used.</p>
      <ul>
        <li>
          <Link href="/bestfetch">
            <a>responseCache</a>
          </Link>
        </li>
        <li>
          <Link href="/bestfetch">
            <a>activeRequests</a>
          </Link>
        </li>
        <li>
          <Link href="/bestfetch">
            <a>CacheMissError</a>
          </Link>
        </li>
        <li>
          <Link href="/bestfetch">
            <a>getRequestKey()</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
