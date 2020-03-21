import Link from 'next/link';

export default function About() {
  return (
    <div className="page">
      <h1>Caching</h1>
      <p>
        Caching allows requests to immediately resolve with a response that has
        already been received.
      </p>
      <div>
        Back to{' '}
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
}
