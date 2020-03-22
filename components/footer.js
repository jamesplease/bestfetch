import React, { Component } from 'react';
import styles from './footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <span className={styles.footer_licenseText}>
          bestfetch is licensed under the{' '}
          <a
            href="https://github.com/jamesplease/bestfetch/blob/master/LICENSE"
            className={styles.footer_licenseLink}>
            MIT License
          </a>
          .
        </span>
        <span className={styles.footer_licenseTextShort}>
          <i className="zmdi zmdi-globe footer_icon" />
          <a
            href="https://github.com/jamesplease/bestfetch/blob/master/LICENSE"
            className="footer_licenseLink footer_licenseLink-short">
            MIT License
          </a>
        </span>
        <a
          className={styles.footer_githubLink}
          href="https://github.com/jamesplease/bestfetch">
          <i className="zmdi zmdi-github footer_icon" />{' '}
          <span className={styles.footer_githubLinkText}>
            View Project on GitHub
          </span>
        </a>
      </footer>
    );
  }
}
