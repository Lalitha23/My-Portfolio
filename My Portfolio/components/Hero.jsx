import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Portfolio</span>
        </div>

        <h1 className={styles.name}>Lalitha Pammi</h1>

        <p className={styles.title}>AI Builder | TPM | Enterprise SaaS</p>

        <div className={styles.bioBlock}>
          <p className={styles.bioParagraph}>
            I came to product through engineering—and that shapes how I operate. I start with
            systems, not solutions: where they connect, where they break, and where complexity hides.
          </p>
          <p className={styles.bioParagraph}>
            Ten years leading product and program work in regulated enterprise SaaS—owning delivery
            end-to-end, turning ambiguity into executable systems, staying close to the build.
          </p>
          <p className={styles.bioParagraph}>
            AI is not a trend to me—it&apos;s force multiplication. I don&apos;t just study
            agents—I build them. Multi-agent workflows, compliance-driven systems, applied tools,
            even games.
          </p>
          <p className={`${styles.bioParagraph} ${styles.bioParagraphClosing}`}>
            Built, tested, and shipped.
          </p>
        </div>

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
    </section>
  );
}
