import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.name}>Lalitha Pammi</span>
        <span className={styles.divider} aria-hidden="true">·</span>
        <a
          href="https://www.linkedin.com/in/lalithapammi"
          className={styles.linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
