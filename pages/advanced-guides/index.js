import Link from '../../components/link';

export default () => {
  return (
    <div className="page">
      <h1>Advanced Guides</h1>
      <p>
        The following guides contain information about bestfetch that most users
        of the library do not need to know to use the library successfully.
        However, for certain situations they may help you use the library more
        effectively.
      </p>
      <ul>
        <li>
          <Link href="/advanced-guides/managing-server-errors">
            <a>Managing Server Errors</a>
          </Link>
        </li>
        <li>
          <Link href="/advanced-guides/identical-requests">
            <a>Identical Requests</a>
          </Link>
        </li>
        <li>
          <Link href="/advanced-guides/other-response-types">
            <a>Other Response Types</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
