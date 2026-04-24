import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Portfolio</span>
          </div>

          <h1 className={styles.name}>Lalitha Pammi</h1>

          <p className={styles.title}>Senior Technical Program Manager</p>

          <p className={styles.bio}>
            10+ years in enterprise SaaS and government compliance SaaS.
            Currently on a career break, actively building AI projects and upskilling —
            shipping real tools with MCP, RAG, and the Claude API.
          </p>

          <div className={styles.ctas}>
            <a href="#projects" className={styles.primaryCta}>
              View My Projects
            </a>
            <a
              href="https://github.com/Lalitha23"
              className={styles.secondaryCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.placeholder}>
            <PersonIcon />
            <span className={styles.placeholderText}>Professional Photo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonIcon() {
  return (
    <svg
      className={styles.placeholderIcon}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="28" r="18" fill="#5B9BD5" opacity="0.25" />
      <circle cx="40" cy="28" r="13" fill="#5B9BD5" opacity="0.4" />
      <path
        d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30"
        stroke="#5B9BD5"
        strokeWidth="2"
        strokeLinecap="round"
        fill="#5B9BD5"
        fillOpacity="0.15"
      />
    </svg>
  );
}
