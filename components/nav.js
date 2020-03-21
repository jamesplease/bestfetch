import Link from './active-link';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link activeClassName="activeNavLink" href="/">
            <a className={styles.navSectionLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navListItem}>
          <Link activeClassName="activeNavLink" href="/getting-started">
            <a className={styles.navSectionLink}>Getting Started</a>
          </Link>
        </li>
        <li className={styles.navListItem}>
          <Link activeClassName="activeNavLink" href="/guides">
            <a className={styles.navSectionLink}>Guides</a>
          </Link>
          <ul className={styles.navSubList}>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/guides/making-requests">
                <a className={styles.navLink}>Making Requests</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/guides/caching-responses">
                <a className={styles.navLink}>Caching Responses</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/guides/invalidating-the-cache">
                <a className={styles.navLink}>Invalidating the Cache</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/guides/deduplicating-requests">
                <a className={styles.navLink}>Deduplicating Requests</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/guides/other-response-types">
                <a className={styles.navLink}>Other Response Types</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link activeClassName="activeNavLink" href="/guides/faq">
                <a className={styles.navLink}>FAQ</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.navListItem}>
          <Link activeClassName="activeNavLink" href="/docs">
            <a className={styles.navSectionLink}>API</a>
          </Link>
          <ul className={`${styles.navSubList} ${styles.navApiSubList}`}>
            <li className={styles.navSubListItem}>
              <Link activeClassName="activeNavLink" href="/docs/bestfetch">
                <a className={styles.navLink}>bestfetch()</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link activeClassName="activeNavLink" href="/docs/response-cache">
                <a className={styles.navLink}>responseCache</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/docs/active-requests">
                <a className={styles.navLink}>activeRequests</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/docs/cache-miss-error">
                <a className={styles.navLink}>CacheMissError</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link
                activeClassName="activeNavLink"
                href="/docs/get-request-key">
                <a className={styles.navLink}>getRequestKey()</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
