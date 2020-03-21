import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" as={process.env.BACKEND_URL + '/'}>
        <a className={styles.logo}>⭐️ bestfetch</a>
      </Link>
      <a
        className={styles.githubLink}
        href="https://github.com/jamesplease/bestfetch">
        GitHub
      </a>
    </header>
  );
}
