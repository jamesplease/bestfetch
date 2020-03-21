import Link from 'next/link';

export default function Guides() {
  return (
    <div className="page">
      <h1>Guides</h1>
      <p>
        Follow these guides to learn the best practices for using bestfetch.
      </p>
      <ul>
        <li>
          <Link href="/guides/response-caching">
            <a>Response Caching</a>
          </Link>
        </li>
        <li>
          <Link href="/guides/invalidating-the-cache">
            <a>Invalidating the Cache</a>
          </Link>
        </li>
        <li>
          <Link href="/guides/deduplicating-requests">
            <a>Deduplicating Requests</a>
          </Link>
        </li>
        <li>
          <Link href="/guides/faq">
            <a>FAQ</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
