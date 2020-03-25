import Link from '../../components/link';

export default () => {
  return (
    <div className="page">
      <h1>Advanced Guides</h1>
      <p>
        The following guides explain information about bestfetch that are not
        useful for most applications.
      </p>
      <ul>
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
