import Link from 'next/link';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link href="/">
            <a className={styles.navSectionLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navListItem}>
          <Link href="/getting-started">
            <a className={styles.navSectionLink}>Getting Started</a>
          </Link>
        </li>
        <li className={styles.navListItem}>
          <Link href="/guides">
            <a className={styles.navSectionLink}>Guides</a>
          </Link>
          <ul className={styles.navSubList}>
            <li className={styles.navSubListItem}>
              <Link href="/guides/caching-responses">
                <a className={styles.navLink}>Caching Responses</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/guides/invalidating-the-cache">
                <a className={styles.navLink}>Invalidating the Cache</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/guides/deduplicating-requests">
                <a className={styles.navLink}>Deduplicating Requests</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/guides/faq">
                <a className={styles.navLink}>FAQ</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.navListItem}>
          <Link href="/api">
            <a className={styles.navSectionLink}>API</a>
          </Link>
          <ul className={`${styles.navSubList} ${styles.navApiSubList}`}>
            <li className={styles.navSubListItem}>
              <Link href="/api/bestfetch">
                <a className={styles.navLink}>bestfetch()</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/api/responsecache">
                <a className={styles.navLink}>responseCache</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/api/activerequests">
                <a className={styles.navLink}>activeRequests</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/api/cachemisserror">
                <a className={styles.navLink}>CacheMissError</a>
              </Link>
            </li>
            <li className={styles.navSubListItem}>
              <Link href="/api/getrequestkey">
                <a className={styles.navLink}>getRequestKey()</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
